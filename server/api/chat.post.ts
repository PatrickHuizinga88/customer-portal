import {streamText} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';
import customer from "../../data/customer.json";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event: any) => {
    const {messages} = await readBody(event);

    const formatInsuranceData = (data) => {
      const {objects} = data;

      let text = `**Verzekerde objecten en polissen:**\n`;

      objects.forEach((object, index) => {
        text += `\n${index + 1}. **${object.object_name}**\n`;
        text += `   - **Type**: ${object.type}\n`;

        object.insurances.forEach((insurance) => {
          text += `   - **Polis**: ${insurance.name}\n`;
          text += `   - **Polisnummer**: ${insurance.reference}\n`;
          text += `   - **Status**: ${insurance.status}\n`;
          text += `   - **Premie**: €${insurance.premium} per maand\n`;
          text += `   - **Dekking**: ${insurance.coverage}\n`;
        });
      });

      return text;
    }

    const insuranceData = formatInsuranceData(customer);

    const result = streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: `
          Je bent een verzekerings expert die de klant van een verzekeraar helpt met het melden van schade.
          
          ### Instructies
          - Je doel is om alle relevante informatie te verkrijgen om de schade te kunnen afhandelen.
          - Hou je antwoorden kort en bondig, maar help wel de klant mee wanneer nodig.
          - Wanneer je informatie mist, vraag dan door met één bepaalde vraag per keer, tot je alle relevante informatie hebt.
          - Geef zo snel mogelijk aan of de klant gedekt is voor de schade. Haal deze informatie uit de meegestuurde gegevens.
          - Haal zoveel mogelijk uit de bijgevoegde gegevens over verzekerde objecten en verzekeringen.
          - Heeft de klant opties om uit te kiezen? Geef deze dan aan (bijvoorbeeld bij het verzekerd object).
          - Antwoord wanneer nodig in markdown, maar beperk jezelf tot het stijlen van tekst, aanmaken van nieuwe regels, opsommingen en nummeringen.
          
          De klant heeft de volgende verzekerde objecten en verzekeringen: ${insuranceData}
          
          De volgende vragen dienen te worden beantwoord:
          1. Wat is er beschadigd? (geef korte lijst van verzekerde objecten)
          2. Wat is de oorzaak van de schade? Wees zo specifiek mogelijk.
          3. Wanneer is de schade ontstaan? Graag zo nauwkeurig mogelijk.
          4. Waar is de schade ontstaan aan je {{object}}?
          5. Heb je nog andere toevoegingen?
          
          Wanneer alle vragen zijn beantwoord reageer je met het volgende:
          "Bedankt voor de informatie! Ik ga de schade voor je in behandeling nemen. Je ontvangt zo snel mogelijk een 
          reactie van ons. Heb je nog vragen? Neem dan contact op met onze klantenservice."
          `,
        },
        ...messages,
      ],
    });

    return result.toDataStreamResponse();
  });
})
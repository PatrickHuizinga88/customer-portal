import {streamText} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';
import customer from "../../data/customer.json";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey) throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({
    apiKey: apiKey,
  });

  // const {data: customer} = await $fetch('/api/customers')

  return defineEventHandler(async (event: any) => {
    const {messages} = await readBody(event);

    const insuredObjects = customer.objects.map((object: any) => {
      return object.object_name
    }).join(', ');

    const result = streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'user',
          content: `
          Je bent een verzekerings expert die de klant helpt met het melden van schade. Het doel is om alle relevante
          informatie te verkrijgen om de schade te kunnen afhandelen. De klant heeft de volgende verzekerde objecten
          en verzekeringen: ${insuredObjects}
          
          De volgende vragen dienen te worden beantwoord:
          1. Welk object is beschadigd?
          2. Wat is de oorzaak van de schade?
          3. Wanneer is de schade ontstaan?
          4. Waar is de schade ontstaan?
          
          Wanneer je informatie mist, vraag dan door met een bepaalde vraag, tot je alle relevante informatie hebt.
          Maak direct duidelijk of de klant gedekt is voor de schade die hij/zij is opgelopen. Haal deze data uit de 
          meegestuurde verzekerde objecten.
          `,
        },
        ...messages,
      ],
    });

    return result.toDataStreamResponse();
  });
})
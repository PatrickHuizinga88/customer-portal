import OpenAI from "openai";
import chat from "../../data/chat.json";
import customer from "../../data/customer.json";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  const openai = new OpenAI({apiKey: openaiApiKey});

  const formatChatToMarkdown = (chat) => {
    const {messages} = chat;
    const {name} = customer;

    return messages
      .map((message) => {
        const roleLabel = message.role === "user" ? `${name} (klant)` : "Assistent";
        return `**${roleLabel}:** ${message.content}`;
      })
      .join("\n");
  }

  try {
    // const {messages} = await readBody(event)

    const user = "Pietje Puck"
    const policy = "123456789"
    const claimType = "1b7bd772-1fcd-43e2-a6cb-9522297bbfd5"

    const date = new Date();

    const prompt = `
    Een klant heeft een schade gemeld. De onderstaande chat dient te worden omgevormd naar een bepaald formaat in JSON.
    
    ${formatChatToMarkdown(chat)}
    
    ### Instructions:
    1. Antwoord alleen met pure, parsable JSON zonder geen extra tekst, captions of het formaat van de response aan het begin.
    2. Gebruik de derde persoonsvorm voor de klant.
    2. De JSON moet exact overeen komen met de volgende structuur:
    {
      "claimed_by": {{ (bedrijfs)naam van klant }},
      "claim_date": {{ retrieve date from chat history in format "YYYY-MM-DD", ten opzichte van vandaag ${date} }},
      "policy_guid": "32432432342",
      "claim_type": "1b7bd772-1fcd-43e2-a6cb-9522297bbfd5",
      "claim_cause": {{ retrieve cause from chat history }},
    }
    
    Begin het genereren hieronder.
  `

    const {data} = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "user", content: prompt},
      ],
      temperature: 0.7,
    }).withResponse();

    const {public: {backendUrl}, novuloUsername, novuloPassword} = useRuntimeConfig(event)

    return await $fetch(`${backendUrl}/addclaim`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(novuloUsername + ":" + novuloPassword)}`
      },
      body: JSON.parse(data.choices[0].message.content)
    })

  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred. Please try again later.",
        error
      }
    }
  }
})
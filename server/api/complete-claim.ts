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

  // try {
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
    3. De JSON moet exact overeen komen met de volgende structuur:
    {
      "claimed_by": "729",
      "claim_date": {{ retrieve date from chat history in format "YYYY-MM-DD", ten opzichte van vandaag ${date} }},
      "policy_guid": "ca31d94e-98af-45f9-9dc6-89210f17f687",
      "claim_type": "1b7bd772-1fcd-43e2-a6cb-9522297bbfd5",
      "claim_subject": {{ retrieve subject of cause from chat history }},
      "claim_cause": "b970f089-3493-440f-b087-28d9d82a9ac9",
      "answers": [
        {
            "guid": "08309c2c-4647-4ab0-9881-51b06f43aa7f",
            "answer_as_string": "12",
            "explanation": "uitleg"
        }
      ]
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

    const response = await $fetch(`${backendUrl}/addclaim`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(novuloUsername + ":" + novuloPassword)}`
      },
      body: JSON.parse(data.choices[0].message.content)
    })

    return {
      data,
      response,
      chat: formatChatToMarkdown(chat)
    }

  // } catch (error) {
  //   return {
  //     data: null,
  //     error: {
  //       message: "An error occurred. Please try again later.",
  //       error
  //     }
  //   }
  // }
})
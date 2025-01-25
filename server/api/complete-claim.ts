import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  const openai = new OpenAI({apiKey: openaiApiKey});

  try {
    const {messages} = await readBody(event)

    return messages

    const user = "Pietje Puck"
    const policy = "123456789"
    const claimType = "Auto"

    const prompt = `
    Een klant heeft een schade gemeld. De onderstaande chat dient te worden omgevormd naar een bepaald formaat in JSON.
    
    ${messages}
    
    ### Instructions:
    De JSON moet streng overeen komen met de volgende structuur, zonder escape tekens:
    {
      "claimed_by": ${user},
      "claim_date": {{ retrieve date from chat history }},
      "policy_guid": ${policy},
      "claim_type": ${claimType},
      "claim_cause": {{ retrieve cause from chat history }},
    }
    
    Begin het genereren hieronder.
  `

    // return {
    //   data: {
    //     choices: [
    //       { message: { content: exampleResponse } }
    //     ]
    //   }
    // }

    const { data: response } =  await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "user", content: prompt},
      ],
      temperature: 0.7,
    }).withResponse();
    return {
      data: response.choices[0].message.content
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while generating the meal plan. Please try again later.",
        error
      }
    }
  }
})
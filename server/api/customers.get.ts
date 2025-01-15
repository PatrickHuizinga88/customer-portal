interface Response {
  success: boolean
  error: string
  httpcode: number
  response: any[]
}

export default defineEventHandler(async (event) => {
  const {public: { backendUrl }, novuloUsername, novuloPassword} = useRuntimeConfig(event)

  const {response} = await $fetch<Response>(`${backendUrl}/customer`, {
    query: {
      guid: 'c71385c7-12ba-4930-91b1-7cee58503239'
    },
    headers: {
      Authorization: `Basic ${btoa(novuloUsername + ":" + novuloPassword)}`
    }
  })

  return response[0]
})
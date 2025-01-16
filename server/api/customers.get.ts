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
      guid: 'd9caa03c-2544-46b3-bb12-53ae94e7f025'
    },
    headers: {
      Authorization: `Basic ${btoa(novuloUsername + ":" + novuloPassword)}`
    }
  })

  return response[0]
})
interface Response {
  success: boolean
  error: string
  httpcode: number
  response: any
}

export default defineEventHandler(async (event) => {
  // const {novuloUsername, novuloPassword} = useRuntimeConfig(event)
  //
  // const {response} = await $fetch<Response>('https://vds105.novulo.com/brickinpoc/rest/customer', {
  //   headers: {
  //     Authorization: `Basic ${btoa(novuloUsername + ":" + novuloPassword)}`
  //   }
  // })

  const {response} = await $fetch<Response>('http://localhost:3001/customers')

  return response
})
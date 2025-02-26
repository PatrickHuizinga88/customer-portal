import {serverSupabaseUser} from "#supabase/server";

interface Response {
  success: boolean
  error: string
  httpcode: number
  response: any[]
}

export default defineEventHandler(async (event) => {
  const {public: { backendUrl }, novuloUsername, novuloPassword} = useRuntimeConfig(event)
  const user = await serverSupabaseUser(event)

  if (!user) return null

  const {response} = await $fetch<Response>(`${backendUrl}/customer`, {
    query: {
      guid: user.user_metadata.external_user_id || 'd9caa03c-2544-46b3-bb12-53ae94e7f025'
    },
    headers: {
      Authorization: `Basic ${btoa(novuloUsername + ":" + novuloPassword)}`
    }
  })

  return response[0]
})
import { Resend } from 'resend';
import {serverSupabaseClient} from "#supabase/server";

interface Body {
  sender: string;
  subject: string;
  message: string;
}
const {public: {companyId}, resendApiKey} = useRuntimeConfig();
const resend = new Resend(resendApiKey);

export default defineEventHandler(async (event) => {
  const { sender, subject, message } = await readBody<Body>(event);
  const client = await serverSupabaseClient(event)

  try {
    const {data: supportSettings, error} = await client.from('company_info').select('email').eq('company_id', companyId).single()
    if (error) throw error

    const {name: senderName} = await $fetch('/api/customers')

    const dateAndTime = new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });

    return await resend.emails.send({
      from: `${senderName} <support@lapzy.nl>`,
      to: [sender], // TODO: Change to real support email
      // to: [supportSettings.email || 'support@patrickhuizinga.nl'],
      subject: subject,
      html: `
        <h1 style="font-weight: 400; color: red; margin-bottom: 32px;">DIT IS EEN TEST E-MAIL</h1>
        <p>Er is een bericht verstuurd via het contactformulier.</p>
        <p style="margin-bottom: 0">
          Van: ${sender} <br/>
          Onderwerp: ${subject} <br/>
          Verzonden op: ${dateAndTime}
        </p>
        <br/>
        <h4 style="margin-bottom: 12px">Bericht</h4>
        <p>${message}</p>`,
    });
  } catch (error) {
    return { error };
  }
});
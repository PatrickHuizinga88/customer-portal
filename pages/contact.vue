<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Mail, MapPin, Phone, Send, MessageCircle, CheckCircle} from "lucide-vue-next";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from 'zod'
import {useForm} from "vee-validate";
import {CardHeader} from "~/components/ui/card";
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()
const {public: {companyId}} = useRuntimeConfig()

const {data: supportSettings} = await useAsyncData(async () => {
  try {
    const {data, error} = await supabase.from('support_settings')
        .select('email,phone,whatsapp,street_name,house_number,postal_code,city,opening_hours')
        .filter('company_id', 'eq', companyId)
        .single()
    if (error) throw error
    return data
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'retrieve',
      item: t('contact.contact_details')
    })
    console.error(error)
    return {data: null, error}
  }
})

const subjectOptions = [
  {id: 1, value: 'Vraag over mijn huidige verzekering(en)'},
  {id: 2, value: 'Vraag over een nieuwe verzekering'},
  {id: 3, value: 'Vraag over mijn schadeclaim'},
  {id: 5, value: 'Vraag over mijn factuur'},
  {id: 6, value: 'Vraag over mijn persoonlijke gegevens'},
  {id: 7, value: 'Ik wil een klacht indienen'},
  {id: 8, value: 'Overige'},
]

const loading = ref(false)
const success = ref(false)

const formSchema = toTypedSchema(z.object({
  subject: z.string({
    message: t('common.validations.required')
  }),
  message: z.string({
    message: t('common.validations.required')
  }).min(10, t('common.validations.min', {min: 10})),
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true

    const {error} = await $fetch('/api/send', {
      method: 'POST',
      body: {
        sender: user.value?.email,
        subject: values.subject,
        message: values.message,
      }
    })
    if (error) throw error

    success.value = true
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save', // TODO: Change to 'send'
      item: t('contact.contact_form.message')
    })
    console.error(error)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <Page :title="$t('contact.header.title')" :description="$t('contact.header.description')">
    <div class="grid md:grid-cols-3 items-start gap-6">
      <div class="md:order-last">
        <img src="../assets/images/support.webp" alt="Support"
             class="hidden md:block w-full rounded-2xl aspect-video mb-6 object-cover">
        <ul v-if="supportSettings" class="space-y-2">
          <li v-if="supportSettings.phone">
            <a :href="`tel:${supportSettings.phone}`"
               class="flex items-center gap-4 bg-muted/50 rounded-xl p-3 hover:bg-muted duration-150">
              <div class="size-9 bg-primary/20 text-primary-dark rounded-lg flex items-center justify-center shrink-0">
                <Phone class="size-5"/>
              </div>
              <div class="text-sm w-0 flex-1">
                <div class="font-medium">{{ $t('contact.contact_details.phone') }}</div>
                <div class="truncate">{{ supportSettings.phone }}</div>
              </div>
            </a>
          </li>
          <li v-if="supportSettings.email">
            <a :href="`mailto:${supportSettings.email}`"
               class="flex items-center gap-4 bg-muted/50 rounded-xl p-3 hover:bg-muted duration-150">
              <div class="size-9 bg-primary/20 text-primary-dark rounded-lg flex items-center justify-center shrink-0">
                <Mail class="size-5"/>
              </div>
              <div class="text-sm w-0 flex-1">
                <div class="font-medium">{{ $t('contact.contact_details.email') }}</div>
                <div class="truncate">{{ supportSettings.email }}</div>
              </div>
            </a>
          </li>
          <li v-if="supportSettings.whatsapp">
            <a :href="`https://wa.me/${supportSettings.whatsapp}`" target="_blank"
               class="flex items-center gap-4 bg-muted/50 rounded-xl p-3 hover:bg-muted duration-150">
              <div class="size-9 bg-primary/20 text-primary-dark rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle class="size-5"/>
              </div>
              <div class="text-sm w-0 flex-1">
                <div class="font-medium">{{ $t('contact.contact_details.whatsapp') }}</div>
                <div class="truncate">{{ supportSettings.whatsapp }}</div>
              </div>
            </a>
          </li>
          <li v-if="supportSettings.street_name && supportSettings.house_number && supportSettings.postal_code && supportSettings.city">
            <a :href="`https://www.google.com/maps/search/?api=1&query=${supportSettings.whatsapp}`" target="_blank"
               class="flex items-center gap-4 bg-muted/50 rounded-xl p-3 hover:bg-muted duration-150">
              <div class="size-9 bg-primary/20 text-primary-dark rounded-lg flex items-center justify-center shrink-0">
                <MapPin class="size-5"/>
              </div>
              <div class="text-sm w-0 flex-1">
                <div class="font-medium">{{ $t('contact.contact_details.address') }}</div>
                <div class="truncate">{{
                    `${supportSettings.street_name} ${supportSettings.house_number}, ${supportSettings.postal_code} ${supportSettings.city}`
                  }}
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div v-else class="text-muted-foreground">
          {{ $t('common.general.no_records_found', {item: lowercase($t('contact.contact_details'))}) }}
        </div>
      </div>
      <Card class="md:col-span-2">
        <CardHeader class="pb-0 justify-start">
          <CheckCircle v-if="success" class="size-6 text-success shrink-0 mt-1 sm:mt-2"/>
          <div>
            <h2 class="h3">{{
                !success ? $t('contact.contact_form.title') : $t('contact.contact_form.success.title')
              }}</h2>
            <p class="text-muted-foreground mt-1">{{
                !success ? $t('contact.contact_form.description') : $t('contact.contact_form.success.description')
              }}</p>
          </div>
        </CardHeader>
        <form v-if="!success" @submit="onSubmit" class="space-y-6 mt-5">
          <FormField v-slot="{ componentField}" name="subject">
            <FormItem>
              <FormLabel>{{ $t('contact.contact_form.subject') }}</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="$t('contact.contact_form.select_a_subject')"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem v-for="option in subjectOptions" :value="option.value">
                      {{ option.value }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField}" name="message">
            <FormItem>
              <FormLabel>{{ $t('contact.contact_form.message') }}</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" rows="4"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <Button type="submit" :loading="loading" class="w-full sm:w-auto">
            <Send/>
            {{ capitalizeSentence($t('common.actions.send_item', {item: $t('contact.contact_form.message')})) }}
          </Button>
        </form>
      </Card>
    </div>
  </Page>
</template>

<style scoped>

</style>
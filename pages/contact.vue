<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Mail, MapPin, Phone, Send, MessageCircle, CheckCircle, Plus, Info} from "lucide-vue-next";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from 'zod'
import {useForm} from "vee-validate";
import {CardHeader} from "~/components/ui/card";
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()
const dayjs = useDayjs()
const {public: {companyId}} = useRuntimeConfig()

const {data: supportSettings} = await useAsyncData(async () => {
  try {
    const {data, error} = await supabase.from('company_info')
        .select('email,phone,whatsapp,street_name,house_number,postal_code,city,opening_hours,support_image_url')
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
  {id: 1, value: t('contact.contact_form.subjects.current_insurances')},
  {id: 2, value: t('contact.contact_form.subjects.new_insurances')},
  {id: 3, value: t('contact.contact_form.subjects.claim')},
  {id: 5, value: t('contact.contact_form.subjects.invoice')},
  {id: 6, value: t('contact.contact_form.subjects.personal_data')},
  {id: 7, value: t('contact.contact_form.subjects.complaint')},
  {id: 8, value: t('contact.contact_form.subjects.other')},
]

const loading = ref(false)
const success = ref(false)
const showOpeningHours = ref(false)

const today = computed(() => {
  if (!supportSettings.value.opening_hours) return
  const now = dayjs();
  const today = now.format('dddd').toLowerCase();

  return supportSettings.value.opening_hours.find(day => day.day === today)
})

const isWithinOpeningHours = computed(() => {
  if (!supportSettings.value.opening_hours) return
  const now = dayjs();
  const today = now.format('dddd').toLowerCase();

  const todaySchedule = supportSettings.value.opening_hours.find(day => day.day === today);
  if (!todaySchedule) return false;

  const currentHour = now.format('HH')
  return todaySchedule.time_ranges.some((timeRange: { from: string, to: string }) => {
    const from = parseInt(timeRange.from.split(':')[0])
    const to = parseInt(timeRange.to.split(':')[0])
    return from <= parseInt(currentHour) && parseInt(currentHour) <= to
  })
})

const openingHoursCardTitle = computed(() => {
  switch (today.value.time_ranges.length) {
    case 1:
      return t('contact.opening_hours.today_open_at', {
        timeRange: `${today.value.time_ranges[0].from} - ${today.value.time_ranges[0].to}`
      })
    case 2:
      return `${t('contact.opening_hours.today_open_at', {
        timeRange: `${today.value.time_ranges[0].from} - ${today.value.time_ranges[0].to}`
      })} ${t('common.general.and')} ${today.value.time_ranges[1].from} - ${today.value.time_ranges[1].to}`
    default:
      return t('contact.opening_hours.today_closed')
  }
})

const formSchema = toTypedSchema(z.object({
  subject: z.string({
    message: t('common.validations.required')
  }),
  message: z.string({
    message: t('common.validations.required')
  }).min(10, t('common.validations.min_length', {min: 10})),
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
    <NuxtLinkLocale to="faq" class="group md:hidden">
      <Alert variant="info"
             class="group-hover:bg-info/15 mb-6 duration-150 ring-offset-background transition-colors group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
        <Info class="size-4"/>
        <AlertTitle>{{ $t('contact.check_our_faq.title') }}</AlertTitle>
        <AlertDescription>
          {{ $t('contact.check_our_faq.description') }}
        </AlertDescription>
      </Alert>
    </NuxtLinkLocale>
    <div class="grid md:grid-cols-3 items-start gap-6">
      <div class="md:col-span-2">
        <NuxtLinkLocale to="faq" class="group hidden md:block">
          <Alert variant="info"
                 class="group-hover:bg-info/15 mb-6 duration-150 ring-offset-background transition-colors group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
            <Info class="size-4"/>
            <AlertTitle>{{ $t('contact.check_our_faq.title') }}</AlertTitle>
            <AlertDescription>
              {{ $t('contact.check_our_faq.description') }}
            </AlertDescription>
          </Alert>
        </NuxtLinkLocale>
        <Card>
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
      <div class="order-first md:order-last">
        <img :src="supportSettings.support_image_url ?? '../assets/images/support.webp'" alt="Support"
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
            <a :href="`https://www.google.com/maps/search/?api=1&query=${supportSettings.street_name} ${supportSettings.house_number}, ${supportSettings.postal_code} ${supportSettings.city}`"
               target="_blank"
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
        <Card v-if="supportSettings.opening_hours" class="sm:text-sm mt-6">
          <CardHeader class="items-center">
            <CardTitle>{{ openingHoursCardTitle }}
            </CardTitle>
            <CardAction class="mr-0 shrink-0">
              <div :class="['size-2 rounded-full', isWithinOpeningHours ? 'bg-success' : 'bg-destructive']"
                   aria-hidden="true"></div>
              <span class="sr-only">{{ isWithinOpeningHours ? $t('contact.opening_hours.currently_open') : $t('contact.opening_hours.currently_closed') }}</span>
            </CardAction>
          </CardHeader>
          <Button v-if="!showOpeningHours" variant="outline" size="sm" class="w-full" @click="showOpeningHours = true">
            {{ $t('contact.opening_hours.show_all') }}
            <Plus/>
          </Button>
          <ol v-else class="space-y-2 md:space-y-3 xl:space-y-2">
            <li v-for="day in supportSettings.opening_hours"
                :class="['flex md:flex-col lg:flex-row justify-between gap-y-1', { 'text-muted-foreground': !day.time_ranges.length }, { 'font-semibold': day.day === today.day }]">
              <div>{{ $t(`contact.opening_hours.days.${day.day}`) }}</div>
              <ol v-if="day.time_ranges.length" class="space-y-1 tabular-nums">
                <li v-for="timeRange in day.time_ranges">{{ `${timeRange.from} - ${timeRange.to}` }}</li>
              </ol>
              <div v-else>{{ $t('contact.opening_hours.closed') }}</div>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  </Page>
</template>

<style scoped>

</style>
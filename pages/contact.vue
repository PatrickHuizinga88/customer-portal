<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Mail, MapPin, Phone, Send, MessageCircle} from "lucide-vue-next";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from 'zod'
import {useForm} from "vee-validate";
import {CardHeader, CardTitle} from "~/components/ui/card";

const notificationStore = useNotificationStore()
const {t} = useI18n()

const contactDetails = [
  {
    type: 'phone',
    label: t('contact.phone'),
    value: '+31 6 12345678'
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+31 6 12345678'
  },
  {
    type: 'email',
    label: t('contact.email'),
    value: 'support@example.com'
  },
  {
    type: 'address',
    label: t('contact.address'),
    value: 'Straatnaam 123, 1234 AB, Plaatsnaam'
  }
]

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

const contactDetailIcon = (type: string) => {
  switch (type) {
    case 'phone':
      return Phone
    case 'whatsapp':
      return MessageCircle
    case 'email':
      return Mail
    case 'address':
      return MapPin
  }
}

const contactDetailUrl = (type: string, value: string) => {
  switch (type) {
    case 'phone':
      return `tel:${value}`
    case 'whatsapp':
      return `https://wa.me/${value}`
    case 'email':
      return `mailto:${value}`
    case 'address':
      return `https://www.google.com/maps/search/?api=1&query=${value}`
  }
}

const formSchema = toTypedSchema(z.object({
  subject: z.string({
    message: t('common.validations.required')
  }),
  message: z.string({
    message: t('common.validations.required')
  }).min(10, t('common.validations.min', {min: 10})),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  try {
    loading.value = true

    // TODO: Send contact form data to backend
    console.log(values)

  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save', // TODO: Change to 'send'
      item: t('contact.message')
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
        <img src="../assets/images/support.webp" alt="Support" class="hidden md:block w-full rounded-2xl aspect-video mb-6 object-cover">
        <Card class="p-5">
          <ul class="space-y-2">
            <li v-for="detail in contactDetails" :key="detail.type">
              <a :href="contactDetailUrl(detail.type, detail.value)" target="_blank"
                 class="flex items-center gap-4 bg-muted/50 rounded-xl p-3 hover:bg-muted duration-150">
                <div class="size-9 bg-primary/20 text-primary-dark rounded-lg flex items-center justify-center shrink-0">
                  <component :is="contactDetailIcon(detail.type)" class="size-5"/>
                </div>
                <div class="text-sm w-0 flex-1">
                  <div class="font-medium">{{ detail.label }}</div>
                  <div class="truncate">{{ detail.value }}</div>
                </div>
              </a>
            </li>
          </ul>
        </Card>
      </div>
      <Card class="md:col-span-2">
        <CardHeader>
          <div>
            <h2 class="h3">{{ $t('contact.contact_form.title') }}</h2>
            <p class="text-muted-foreground">{{ $t('contact.contact_form.description') }}</p>
          </div>
        </CardHeader>
        <form @submit="onSubmit" class="space-y-6">
          <FormField v-slot="{ componentField}" name="subject">
            <FormItem>
              <FormLabel>{{ $t('contact.subject') }}</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="$t('contact.select_a_subject')"/>
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
              <FormLabel>{{ $t('contact.message') }}</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" rows="4"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <Button type="submit" :loading="loading" class="w-full sm:w-auto">
            <Send/>
            {{ $t('common.actions.send', {item: lowercase($t('contact.message'))}) }}
          </Button>
        </form>
      </Card>
    </div>
  </Page>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {CheckCircle, Send} from "lucide-vue-next";
import {CardHeader} from "~/components/ui/card";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";

const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()

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

    console.log(user.value?.email, values.subject, values.message)

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
</template>

<style scoped>

</style>
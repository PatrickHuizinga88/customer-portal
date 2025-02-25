<script setup lang="ts">
import {CheckCircle} from 'lucide-vue-next'
import {toTypedSchema} from "@vee-validate/zod";
import {useForm} from "vee-validate";
import * as z from 'zod'

definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient()
const {t} = useI18n()

const errorMessage = ref('')
const loading = ref(false)
const success = ref(false)
const resendDelay = ref(10)

const countDown = () => {
  const interval = setInterval(() => {
    resendDelay.value--
    if (resendDelay.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

const formSchema = toTypedSchema(z.object({
  email: z
    .string({message: t('common.validations.required')})
    .email({message: t('authentication.validations.email')}),
}))

const form = useForm({
  validationSchema: formSchema,
})

const signIn = async (email: string) => {
  const {public: {baseUrl, companyId}} = useRuntimeConfig()

  const {error} = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `http://localhost:3000/confirm`,
      // emailRedirectTo: `${baseUrl}/confirm`,
      // data: {
      //   company_id: companyId.toString()
      // }
    }
  })
  if (error) throw error

  resendDelay.value = 10
  countDown()
}

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true

    await signIn(values.email)

    success.value = true
  } catch (error) {
    errorMessage.value = t('authentication.login.sign_in_failed')
    console.error(error)
  }
})
</script>

<template>
  <div>
    <NuxtLayout name="authentication" :title="$t('authentication.common.sign_in')">

      <form v-show="!success" class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" :validate-on-model-update="false" name="email">
          <FormItem>
            <FormLabel>{{ $t('common.general.email') }}</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="email"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>

        <Button type="submit" :loading="loading" class="w-full">
          {{ $t('authentication.common.sign_in') }}
        </Button>

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

      </form>

      <div v-if="success" class="flex flex-col items-center">
        <Alert variant="success">
          <CheckCircle class="size-4"/>
          <AlertTitle>{{ $t('authentication.login.email_sent_success.title') }}</AlertTitle>
          <AlertDescription>{{
              $t('authentication.login.email_sent_success.description', {email: form.values.email})
            }}
          </AlertDescription>
        </Alert>

        <p class="text-sm text-muted-foreground text-center mt-4">
          {{ $t('authentication.register.received_nothing') }}
          <Button @click="onSubmit(form.values.email)" variant="link" class="h-auto p-0 text-primary"
                  :disabled="resendDelay > 0">
            {{ $t('authentication.register.send_again') }}
          </Button>
          <span v-if="resendDelay > 0" class="inline-block ml-1">
          {{ $t('authentication.register.in_seconds', {seconds: resendDelay}) }}
        </span>
        </p>
      </div>

<!--      <template #footer>-->
<!--        {{ $t('authentication.login.no_account') }}-->
<!--        <Button variant="link" size="sm" class="h-auto p-0 ml-1" as-child>-->
<!--          <NuxtLinkLocale to="register">-->
<!--            {{ $t('authentication.login.register_now') }}-->
<!--            <ArrowRight aria-hidden="true"/>-->
<!--          </NuxtLinkLocale>-->
<!--        </Button>-->
<!--      </template>-->
    </NuxtLayout>
  </div>
</template>

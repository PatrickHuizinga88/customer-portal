<script setup lang="ts">
import {ArrowRight, CheckCircle, Loader2} from 'lucide-vue-next'
import Authentication from "~/layouts/authentication.vue";

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const {t} = useI18n()

const form = reactive({
  email: '',
  password: '',
  repeatedPassword: ''
})
const errorMessage = ref('')
const success = ref(false)
const resendDelay = ref(10)
const loading = ref(false)

const countDown = () => {
  const interval = setInterval(() => {
    resendDelay.value--
    if (resendDelay.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

const signUp = async () => {
  if (form.password !== form.repeatedPassword) {
    errorMessage.value = t('authentication.register.passwords_dont_match')
    return
  }

  try {
    loading.value = true

    const {public: {baseUrl}} = useRuntimeConfig()

    const {error} = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${baseUrl}/intro` // TODO: Fix redirection
      }
    })
    if (error) {
      loading.value = false
      throw error
    }
    success.value = true
    resendDelay.value = 10
    countDown()
  } catch (error) {
    errorMessage.value = t('authentication.register.sign_up_failed')
    console.error(error)
  }
}
</script>

<template>
  <Authentication :title="$t('authentication.register.create_new_account')">
    <form v-if="!success" class="space-y-6" @submit.prevent="signUp">
      <div>
        <Label for="email" class="block text-sm font-medium leading-6">{{ $t('common.general.email') }}</Label>
        <Input
            v-model="form.email"
            id="email"
            name="email"
            type="email"
            required/>
      </div>

      <div>
        <Label for="password"
               class="block text-sm font-medium leading-6">{{ $t('authentication.common.password') }}</Label>
        <PasswordInput
            v-model="form.password"
            id="password"
            name="password"
            required/>
      </div>

      <div>
        <Label for="repeated-password"
               class="block text-sm font-medium leading-6">{{ $t('authentication.register.repeat_password') }}</Label>
        <PasswordInput
            v-model="form.repeatedPassword"
            id="repeated-password"
            name="repeated-password"
            required/>
      </div>

      <Button type="submit" :disabled="loading" class="w-full">
        <div v-if="loading" role="status">
          <Loader2 class="size-5 animate-spin"/>
          <span class="sr-only">{{ $t('common.general.loading') }}...</span>
        </div>
        {{ $t('authentication.register.sign_up') }}
      </Button>

      <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

    </form>

    <div v-else class="flex flex-col items-center">
      <Alert variant="success">
        <CheckCircle class="size-4"/>
        <AlertTitle>{{ $t('authentication.register.sign_up_success.title') }}</AlertTitle>
        <AlertDescription>{{
            $t('authentication.register.sign_up_success.description', {email: form.email})
          }}
        </AlertDescription>
      </Alert>

      <p class="text-sm text-muted-foreground mt-4">
        {{ $t('authentication.register.received_nothing') }}
        <Button @click="signUp" variant="link" class="h-auto p-0 text-primary" :disabled="resendDelay > 0">
          {{ $t('authentication.register.send_again') }}
        </Button>
        <span v-if="resendDelay > 0" class="inline-block ml-1">
          {{ $t('authentication.register.in_seconds', {seconds: resendDelay}) }}
        </span>
      </p>
    </div>

    <template #footer>
      {{ $t('authentication.register.have_account') + ' ' }}
      <Button variant="link" class="h-auto p-0 ml-1" as-child>
        <NuxtLink to="/login">
          {{ $t('authentication.common.sign_in') }}
          <ArrowRight class="size-4" aria-hidden="true"/>
        </NuxtLink>
      </Button>
    </template>
  </Authentication>
</template>

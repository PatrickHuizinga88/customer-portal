<script setup lang="ts">
import {Loader2, ArrowRight} from 'lucide-vue-next'
import {PasswordInput} from "~/components/ui/password-input";

definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient()
const {t} = useI18n()

const form = reactive({
  email: '',
  password: ''
})
const errorMessage = ref('')
const loading = ref(false)

const signIn = async () => {
  try {
    loading.value = true
    const {error} = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    if (error) {
      loading.value = false
      throw error
    }
    navigateTo('/')
  } catch (error) {
    errorMessage.value = t('authentication.login.sign_in_failed')
    console.error(error)
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="authentication" :title="$t('authentication.common.sign_in')">

      <form class="space-y-6" @submit.prevent="signIn">
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
          <div class="flex items-center justify-between">
            <Label for="password" class="block text-sm font-medium leading-6">{{
                $t('authentication.common.password')
              }}</Label>
            <Button variant="link" size="sm" class="h-auto p-0 mb-1.5" as-child>
              <NuxtLinkLocale to="password-recovery">
                {{ $t('authentication.login.forgot_password') }}
              </NuxtLinkLocale>
            </Button>
          </div>
          <PasswordInput
              v-model="form.password"
              id="password"
              name="password"
              required/>
        </div>

        <Button type="submit" :disabled="loading" class="w-full">
          <div v-if="loading" role="status">
            <Loader2 class="size-5 animate-spin"/>
            <span class="sr-only">{{ $t('common.general.loading') }}...</span>
          </div>
          {{ $t('authentication.common.sign_in') }}
        </Button>

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

      </form>

      <template #footer>
        {{ $t('authentication.login.no_account') }}
        <Button variant="link" size="sm" class="h-auto p-0 ml-1" as-child>
          <NuxtLinkLocale to="register">
            {{ $t('authentication.login.register_now') }}
            <ArrowRight class="size-4" aria-hidden="true"/>
          </NuxtLinkLocale>
        </Button>
      </template>
    </NuxtLayout>
  </div>
</template>

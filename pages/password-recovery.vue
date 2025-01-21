<script setup lang="ts">
import {ArrowRight, Loader2} from 'lucide-vue-next'
import Authentication from "~/layouts/authentication.vue";

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const email = ref('')
const success = ref(false)
const loading = ref(false)

const resetPassword = async () => {
  try {
    loading.value = true
    const {public: {baseUrl}} = useRuntimeConfig()
    const {error} = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${baseUrl}/update-password`,
    })

    if (error) {
      notificationStore.createNotification({
        type: 'destructive',
        isError: true,
      })
      console.error(error)
      return
    }

    success.value = true
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      isError: true,
    })
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Authentication :title="$t('authentication.password_recovery.reset_your_password')"
                  :description="$t('authentication.password_recovery.put_in_email')">
    <form v-if="!success" class="space-y-6" @submit.prevent="resetPassword">
      <div>
        <Label for="email" class="block text-sm font-medium leading-6">{{ $t('common.general.email') }}</Label>
        <Input
            v-model="email"
            id="email"
            name="email"
            type="email"
            required/>
      </div>

      <Button type="submit" :disabled="loading" class="w-full">
        <div v-if="loading" role="status">
          <Loader2 class="size-5 animate-spin"/>
          <span class="sr-only">{{ $t('common.general.loading') }}...</span>
        </div>
        {{ $t('authentication.password_recovery.send_recovery_link') }}
      </Button>
    </form>

    <p v-else class="text-center">
      {{ $t('authentication.password_recovery.password_reset_email_sent') }} <strong>{{ email }}</strong>.
    </p>

    <template #footer>
      <Button variant="link" size="sm" class="p-0" as-child>
        <NuxtLink to="/login">
          {{ $t('authentication.password_recovery.back_to_sign_in') }}
          <ArrowRight class="size-4" aria-hidden="true"/>
        </NuxtLink>
      </Button>
    </template>
  </Authentication>
</template>

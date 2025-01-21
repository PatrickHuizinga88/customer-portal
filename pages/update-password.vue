<script setup lang="ts">
import {Loader2} from 'lucide-vue-next'
import {useI18n} from 'vue-i18n'
import Authentication from "~/layouts/authentication.vue";

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = t('authentication.password_recovery.passwords_dont_match')
    return
  }
  errorMessage.value = ''

  try {
    loading.value = true
    const {error} = await supabase.auth.updateUser({
      password: newPassword.value
    })

    if (error) {
      if (error.code === 'same_password') {
        errorMessage.value = t('authentication.password_recovery.same_password')
        return
      }
      notificationStore.createNotification({
        type: 'destructive',
        isError: true,
      })
      console.error(error)
      return
    }

    notificationStore.createNotification({
      type: 'success',
      action: 'update',
      item: t('authentication.common.password'),
    })
    navigateTo('/login')
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
  <Authentication :title="$t('authentication.password_recovery.reset_your_password')">
    <form class="space-y-6" @submit.prevent="updatePassword">
      <div>
        <Label for="new-password" class="block text-sm font-medium leading-6">{{
            t('authentication.password_recovery.new_password')
          }}</Label>
        <PasswordInput
            v-model="newPassword"
            id="new-password"
            name="new-password"
            required/>
      </div>

      <div>
        <Label for="confirm-password" class="block text-sm font-medium leading-6">{{
            t('authentication.password_recovery.confirm_password')
          }}</Label>
        <PasswordInput
            v-model="confirmPassword"
            id="confirm-password"
            name="confirm-password"
            required/>
      </div>

      <Button type="submit" :disabled="loading" class="w-full">
        <div v-if="loading" role="status">
          <Loader2 class="size-5 animate-spin"/>
          <span class="sr-only">{{ t('common.general.loading') }}...</span>
        </div>
        {{ t('authentication.password_recovery.update_password') }}
      </Button>

      <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
    </form>
  </Authentication>
</template>

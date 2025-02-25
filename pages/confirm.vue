<script setup lang="ts">
import {LoaderCircle} from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const user = useSupabaseUser()
const error = ref('')

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
  error.value = 'Verification failed, please try again.'
}, { immediate: true })
</script>

<template>
  <div v-if="!error" class="h-screen flex items-center justify-center w-full">
    <LoaderCircle class="text-primary animate-spin size-6"/>
    <span class="sr-only">Waiting to verify...</span>
  </div>
  <div v-else class="flex items-center justify-center w-full">
    <p class="text-muted-foreground">{{ error }}</p>
    <Button as-child>
      <NuxtLink to="/login">Try again</NuxtLink>
    </Button>
  </div>
</template>

<style scoped>

</style>
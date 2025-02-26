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
  error.value = 'Verificatie mislukt. Probeer het opnieuw.'
}, { immediate: true })
</script>

<template>
  <div class="h-screen flex items-center justify-center w-full">
    <template v-if="!error">
      <LoaderCircle class="text-primary animate-spin size-6 mr-2"/>
      <p>Bezig met het ophalen van je gegevens...</p>
    </template>
    <template v-else>
      <p>{{ error }}</p>
      <Button as-child>
        <NuxtLink to="/login" size="sm" class="ml-2">Opnieuw proberen</NuxtLink>
      </Button>
    </template>
  </div>
</template>

<style scoped>

</style>
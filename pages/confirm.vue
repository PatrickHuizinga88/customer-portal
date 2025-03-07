<script setup lang="ts">
import {LoaderCircle} from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const user = useSupabaseUser()
const {t} = useI18n()

const error = ref('')
const currentIndex = ref(0)

const textList = [
  {
    id: 1,
    content: capitalizeSentence(t('authentication.common.fetching_your', {item: t('insurances.insurances', 2)}))
  },
  {
    id: 2,
    content: capitalizeSentence(t('authentication.common.fetching_your', {item: t('profile.profile')}))
  },
  {
    id: 3,
    content: capitalizeSentence(t('authentication.common.fetching_your', {item: t('claims.claims', 2)}))
  },
]

watchEffect(() => {
  const interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % textList.length
  }, 2000)
  return () => clearInterval(interval)
})

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
  error.value = 'Verificatie mislukt. Probeer het opnieuw.'
}, { immediate: true })
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center w-full">
    <template v-if="!error">
      <LoaderCircle class="text-primary animate-spin size-8 mb-4"/>
      <span class="sr-only">{{ $t('common.general.loading') }}</span>
      <transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          mode="out-in">
        <p :key="textList[currentIndex].id" aria-hidden="true">{{ textList[currentIndex].content }}</p>
      </transition>
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
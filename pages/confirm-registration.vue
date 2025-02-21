<script setup lang="ts">
import {CheckCircle} from 'lucide-vue-next'

definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="authentication">
    <CheckCircle class="size-16 text-success mb-6 mx-auto"/>
    <h1 class="text-3xl font-semibold text-center mb-2">{{ $t('authentication.register.account_activated') }}</h1>
    <p class="text-muted-foreground text-center">{{ $t('authentication.register.welcome_to', {companyName: 'DuGardijn'}) }}</p>
    <Button class="w-full mt-6" as-child>
      <NuxtLinkLocale to="login">
        {{ $t('authentication.register.continue_to_login') }}
      </NuxtLinkLocale>
    </Button>
  </NuxtLayout>
</template>

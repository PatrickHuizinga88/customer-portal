<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import type {Database} from "~/types/database.types";
import {useGlobalHead} from "~/composable/useGlobalHead";

defineProps<{
  title?: string
  description?: string
}>()

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()
const {public: {companyId}} = useRuntimeConfig()

const {data: company} = await useAsyncData(async () => {
  const {data} = await supabase.from('companies')
      .select(`
      company_name,
      logo_url,
      branding (
        primary_color,
        accent_color,
        border_radius,
        button_radius,
        heading_font,
        body_font
      )`)
      .filter('id', 'eq', companyId)
      .single()
  return data
})

useGlobalHead(company.value?.branding)
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center sm:bg-muted/50 py-12">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center px-6 sm:px-0 mb-4 sm:mb-6 md:mb-8">
      <transition
          enter-active-class="duration-500"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <img v-if="company.logo_url" :src="company.logo_url" :alt="company.company_name" class="mx-auto h-12 w-auto">
      </transition>
      <transition
          enter-active-class="duration-500 delay-100"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <div class="text-center mt-10">
          <h1 v-if="title" class="text-3xl font-bold tracking-tight">{{ title }}</h1>
          <p v-if="description" class="text-sm text-muted-foreground mt-4">{{ description }}</p>
        </div>
      </transition>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-[440px]">
      <transition
          enter-active-class="duration-500 delay-200"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <div class="bg-background sm:bg-card sm:shadow-sm sm:rounded-xl p-6">
          <slot/>
        </div>
      </transition>
    </div>

    <transition
        enter-active-class="duration-500 delay-300"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-1 translate-y-none"
        appear
    >
      <div class="sm:mt-6 md:mt-10 text-center text-sm text-muted-foreground">
        <slot name="footer"/>
      </div>
    </transition>

    <img v-if="company.logo_url" :src="company.logo_url" alt="" aria-hidden="true" loading="lazy"
         class="fixed left-1/2 -translate-x-1/2 bottom-0 translate-y-3/4 w-screen max-w-2xl aspect-square opacity-[4%] -z-10"/>
  </div>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>

<style scoped>
@media (min-width: 640px) {
  .gradient-shadows {
    box-shadow: 32px 64px 128px -48px hsl(var(--primary) / .1),
    -64px -24px 128px -48px color-mix(in lch increasing hue, hsl(var(--primary) / .1) 33%, hsl(var(--accent) / .1)),
    64px -48px 128px -48px color-mix(in lch increasing hue, hsl(var(--primary) / .1) 67%, hsl(var(--accent) / .1));
  }
}
</style>
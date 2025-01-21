<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import type {Database} from "~/types/database.types";

defineProps<{
  title?: string
  description?: string
}>()

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()

const {data: branding} = await useAsyncData(async () => {
  const {data} = await supabase.from('branding')
      .select('logo_url,company_name,primary_color,accent_color,border_radius,button_radius,heading_font,body_font')
      .filter('id', 'eq', 6)
      .single()
  return data
})

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(branding.value.heading_font)}:wght@500;600;700&family=${encodeURIComponent(branding.value.body_font)}:wght@400;500;600;700&display=swap`,
    },
  ],
  style: [
    {
      innerHTML: `
        :root {
          --primary: ${branding.value.primary_color} !important;
          --accent: ${branding.value.accent_color} !important;
          --radius: ${branding.value.border_radius}rem !important;
          --radius-button: ${branding.value.button_radius}rem !important;
          --font-headings: '${branding.value.heading_font}' !important;
          --font-body: '${branding.value.body_font}' !important;
        }
      `,
    },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center py-12">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center px-6 sm:px-0 sm:mb-6 md:mb-10">
      <transition
          enter-active-class="duration-500"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <img :src="branding.logo_url" :alt="branding.company_name" class="mx-auto h-12 w-auto">
      </transition>
      <transition
          enter-active-class="duration-500 delay-100"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <div>
          <h1 v-if="title" class="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">{{ title }}</h1>
          <p v-if="description" class="text-sm text-muted-foreground mt-2">{{ description }}</p>
        </div>
      </transition>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
      <transition
          enter-active-class="duration-500 delay-200"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <div class="bg-background sm:bg-card sm:border px-6 py-8 gradient-shadows sm:rounded-xl sm:px-8">
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

    <img :src="branding.logo_url" alt="" aria-hidden="true" class="fixed left-1/2 -translate-x-1/2 bottom-0 translate-y-3/4 w-screen max-w-2xl aspect-square opacity-[4%] -z-10"/>
  </div>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>

<style scoped>
.gradient-shadows {
  box-shadow:
      32px 64px 128px -48px hsl(var(--primary) / .1),
      -64px -24px 128px -48px color-mix(in lch increasing hue, hsl(var(--primary) / .1) 33%, hsl(var(--accent) / .1)),
      64px -48px 128px -48px color-mix(in lch increasing hue, hsl(var(--primary) / .1) 67%, hsl(var(--accent) / .1));
}
</style>
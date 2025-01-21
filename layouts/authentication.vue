<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import type {Database} from "~/types/database.types";

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
  <div class="min-h-screen flex flex-col justify-center px-0 sm:px-6 py-12 lg:px-8">
    <slot/>
  </div>

  <NotificationList :notifications="notificationStore.notifications" />

</template>

<style>

</style>
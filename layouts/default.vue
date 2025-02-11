<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import {useNotificationStore} from "~/stores/notificationStore";
import type {Database} from "~/types/database.types";
import Header from "~/components/layout/Header.vue";
import {useGlobalHead} from "~/composable/useGlobalHead";

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()
const {public: {brandingId}} = useRuntimeConfig()

const {data: branding} = await useAsyncData(async () => {
  const {data} = await supabase.from('branding')
      .select('logo_url,company_name,primary_color,accent_color,border_radius,button_radius,heading_font,body_font')
      .filter('id', 'eq', brandingId)
      .single()
  return data
})

useGlobalHead(branding?.value)
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary)"/>
  <Header :logoUrl="branding.logo_url" :companyName="branding.company_name"/>

  <div class="py-10">
    <div class="container">
      <slot/>
    </div>
  </div>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>
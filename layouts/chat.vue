<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import type {Database} from "~/types/database.types";
import {useNotificationStore} from "~/stores/notificationStore";
import {useGlobalHead} from "~/composable/useGlobalHead";

const supabase = useSupabaseClient<Database>()
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

  <main class="h-[calc(100svh-64px)] w-full overflow-auto">
    <slot/>
  </main>
</template>

<style scoped>

</style>
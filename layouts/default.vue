<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import {useNotificationStore} from "~/stores/notificationStore";
import type {Database} from "~/types/database.types";
import Header from "~/components/layout/Header.vue";
import {useGlobalHead} from "~/composable/useGlobalHead";

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()
const {public: {companyId}} = useRuntimeConfig()

const {data: company} = await useAsyncData(async () => {
  const {data} = await supabase.from('companies')
      .select(`
      company_name,
      logo_url,
      branding (*)`)
      .filter('id', 'eq', companyId)
      .single()
  return data
})

useGlobalHead(company.value?.branding)
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary)"/>
  <Header :logoUrl="company?.logo_url ?? ''" :companyName="company?.company_name ?? ''"/>

  <div class="py-10">
    <div class="container">
      <slot/>
    </div>
  </div>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>
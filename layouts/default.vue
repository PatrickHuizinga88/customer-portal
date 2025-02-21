<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import {useNotificationStore} from "~/stores/notificationStore";
import type {Database} from "~/types/database.types";
import Header from "~/components/layout/Header.vue";
import {useGlobalHead} from "~/composable/useGlobalHead";
import {User, ReceiptText, LogOut} from "lucide-vue-next";
import Footer from "~/components/layout/Footer.vue";

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()
const {t} = useI18n()
const {public: {companyId}} = useRuntimeConfig()

const {data: company} = await useAsyncData(async () => {
  const {data} = await supabase.from('companies')
    .select(`
      company_name,
      logo_url,
      branding (*),
      company_info (
        policy_url,
        terms_url,
        facebook_url,
        x_url,
        instagram_url,
        linkedin_url
      )`)
    .filter('id', 'eq', companyId)
    .single()
  return data
})

useGlobalHead(company.value?.branding)

const mainNavItems = [
  {name: t('home.home'), url: '/'},
  {name: t('insurances.my_insurances'), url: 'insurances'},
  {name: t('claims.report_a_claim'), url: 'report-claim'},
  {name: t('contact.contact'), url: 'contact'},
]

const userNavItems = [
  {name: t('profile.my_profile'), url: 'profile', icon: User},
  {name: t('invoices.invoices', 2), url: 'invoices', icon: ReceiptText},
  {name: t('authentication.common.sign_out'), icon: LogOut},
]
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>
  <Header
    :logoUrl="company?.logo_url ?? ''"
    :companyName="company?.company_name ?? ''"
    :mainNavItems="mainNavItems"
    :userNavItems="userNavItems"/>

  <div class="pt-10 pb-24">
    <div class="container">
      <slot/>
    </div>
  </div>

  <Footer
    :logoUrl="company?.logo_url ?? ''"
    :companyName="company?.company_name ?? ''"
    :mainNavItems="mainNavItems"
    :companyInfo="company.company_info"/>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>
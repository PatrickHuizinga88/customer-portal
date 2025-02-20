<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import {useNotificationStore} from "~/stores/notificationStore";
import type {Database} from "~/types/database.types";
import Header from "~/components/layout/Header.vue";
import {useGlobalHead} from "~/composable/useGlobalHead";
import {Facebook, Twitter, Instagram} from "lucide-vue-next";

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()
const {t} = useI18n()
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

const mainNavItems = [
  {name: t('home.home'), url: '/'},
  {name: t('insurances.my_insurances'), url: 'insurances'},
  {name: t('claims.report_a_claim'), url: 'report-claim'},
  {name: t('contact.contact'), url: 'contact'},
]
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary)"/>
  <Header :logoUrl="company?.logo_url ?? ''" :companyName="company?.company_name ?? ''"/>

  <div class="pt-10 pb-24">
    <div class="container">
      <slot/>
    </div>
  </div>

  <footer class="bg-muted">
    <div class="container">
      <div class="flex flex-col md:flex-row items-center justify-between gap-10 text-sm text-muted-foreground py-12">
        <img :src="company?.logo_url" :alt="company?.company_name" class="h-12">
        <div class="flex flex-col sm:flex-row items-center gap-12">
          <nav>
            <ul class="flex flex-col sm:flex-row items-center gap-8 text-center">
              <li v-for="item in mainNavItems">
                <NuxtLinkLocale :to="item.url" class="hover:underline">{{ item.name }}</NuxtLinkLocale>
              </li>
            </ul>
          </nav>
          <ul class="flex gap-2">
            <li>
              <Button variant="outline" size="icon" as-child>
                <a href="https://x.com/"><Twitter/></a>
              </Button>
            </li>
            <li>
              <Button variant="outline" size="icon" as-child>
                <a href="https://facebook.com/">
                  <Facebook/>
                </a>
              </Button>
            </li>
            <li>
              <Button variant="outline" size="icon" as-child>
                <a href="https://twitter.com/">
                  <Instagram/>
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <Separator/>
      <div class="flex flex-col sm:flex-row items-center justify-between py-8 text-xs text-muted-foreground">
        © 2025 {{ company?.company_name }}
        <ul class="flex items-center gap-10 text-center order-first sm:order-last mb-6 sm:mb-0">
          <li>
            <a href="#" class="hover:underline">Privacybeleid</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Algemene Voorwaarden</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Cookie Instellingen</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>
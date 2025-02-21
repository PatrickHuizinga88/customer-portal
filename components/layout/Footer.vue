<script setup lang="ts">
import {Facebook, Instagram, Twitter, Linkedin} from "lucide-vue-next";

const props = defineProps<{
  companyName: string,
  logoUrl?: string,
  mainNavItems: {
    name: string,
    url: string
  }[]
  companyInfo?: {
    policy_url?: string,
    terms_url?: string,
    facebook_url?: string,
    x_url?: string,
    instagram_url?: string,
    linkedin_url?: string
  }
}>()
</script>

<template>
  <footer class="bg-muted">
    <div class="container">
      <div class="flex flex-col md:flex-row items-center justify-between gap-10 text-sm text-muted-foreground py-12">
        <img :src="props.logoUrl" :alt="props.companyName" class="h-12">
        <div class="flex flex-col sm:flex-row items-center gap-12">
          <nav>
            <ul class="flex flex-col sm:flex-row items-center gap-8 text-center">
              <li v-for="item in mainNavItems">
                <NuxtLinkLocale :to="item.url" class="hover:underline">{{ item.name }}</NuxtLinkLocale>
              </li>
            </ul>
          </nav>
          <ul class="flex gap-2" v-if="props.companyInfo?.facebook_url || props.companyInfo?.x_url || props.companyInfo?.instagram_url || props.companyInfo?.linkedin_url">
            <li v-if="props.companyInfo?.facebook_url">
              <Button variant="outline" size="icon" aria-label="Facebook" as-child>
                <a href="https://facebook.com/" target="_blank">
                  <Facebook/>
                </a>
              </Button>
            </li>
            <li v-if="props.companyInfo?.x_url">
              <Button variant="outline" size="icon" aria-label="X (Twitter)" as-child>
                <a :href="props.companyInfo?.x_url" target="_blank">
                  <Twitter/>
                </a>
              </Button>
            </li>
            <li v-if="props.companyInfo?.instagram_url">
              <Button variant="outline" size="icon" as-child>
                <a :href="props.companyInfo?.instagram_url" aria-label="Instagram" target="_blank">
                  <Instagram/>
                </a>
              </Button>
            </li>
            <li v-if="props.companyInfo?.linkedin_url">
              <Button variant="outline" size="icon" aria-label="Linkedin" as-child>
                <a :href="props.companyInfo?.linkedin_url" target="_blank">
                  <Linkedin/>
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <Separator/>
      <div class="flex flex-col sm:flex-row items-center justify-between py-8 text-xs text-muted-foreground">
        © {{ $dayjs().format('YYYY') + ' ' +  props.companyName }}
        <ul class="flex items-center gap-10 text-center order-first sm:order-last mb-6 sm:mb-0">
          <li v-if="props.companyInfo?.policy_url">
            <a :href="props.companyInfo?.policy_url" class="hover:underline">{{ $t('common.footer.privacy_policy') }}</a>
          </li>
          <li v-if="props.companyInfo?.terms_url">
            <a :href="props.companyInfo?.terms_url" class="hover:underline">{{ $t('common.footer.terms_of_service') }}</a>
          </li>
          <li>
            <button class="hover:underline">{{ $t('common.footer.cookie_settings') }}</button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
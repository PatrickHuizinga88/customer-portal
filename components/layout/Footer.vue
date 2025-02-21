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
      <div class="flex flex-col md:flex-row items-center justify-between gap-10 text-sm py-12">
        <img :src="props.logoUrl" :alt="props.companyName" class="h-12">
        <div class="flex flex-col sm:flex-row items-center gap-12">
          <nav>
            <ul class="flex flex-col sm:flex-row items-center gap-8 text-center text-muted-foreground">
              <li v-for="item in mainNavItems">
                <NuxtLinkLocale :to="item.url" class="hover:underline">{{ item.name }}</NuxtLinkLocale>
              </li>
            </ul>
          </nav>
          <ul class="flex gap-2" v-if="props.companyInfo?.facebook_url || props.companyInfo?.x_url || props.companyInfo?.instagram_url || props.companyInfo?.linkedin_url">
            <li v-if="props.companyInfo?.facebook_url">
              <Button variant="outline" size="icon" :aria-label="`${props.companyName} Facebook`" as-child>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                  <img src="@/assets/images/icons/facebook.svg" alt="Facebook" class="size-4"/>
                </a>
              </Button>
            </li>
            <li v-if="props.companyInfo?.x_url">
              <Button variant="outline" size="icon" :aria-label="`${props.companyName} X (Twitter)`" as-child>
                <a :href="props.companyInfo?.x_url" target="_blank" rel="noopener noreferrer">
                  <img src="@/assets/images/icons/x.svg" alt="X" class="size-4"/>
                </a>
              </Button>
            </li>
            <li v-if="props.companyInfo?.instagram_url">
              <Button variant="outline" size="icon" :aria-label="`${props.companyName} Instagram`" as-child>
                <a :href="props.companyInfo?.instagram_url" target="_blank" rel="noopener noreferrer">
                  <img src="@/assets/images/icons/instagram.svg" alt="Instagram" class="size-4"/>
                </a>
              </Button>
            </li>
            <li v-if="props.companyInfo?.linkedin_url">
              <Button variant="outline" size="icon" :aria-label="`${props.companyName} LinkedIn`" as-child>
                <a :href="props.companyInfo?.linkedin_url" target="_blank" rel="noopener noreferrer">
                  <img src="@/assets/images/icons/linkedin.svg" alt="LinkedIn" class="size-4"/>
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
            <a :href="props.companyInfo?.policy_url" class="hover:underline" target="_blank" rel="noopener noreferrer privacy-policy">{{ $t('common.footer.privacy_policy') }}</a>
          </li>
          <li v-if="props.companyInfo?.terms_url">
            <a :href="props.companyInfo?.terms_url" class="hover:underline" target="_blank" rel="noopener noreferrer terms-of-service">{{ $t('common.footer.terms_of_service') }}</a>
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
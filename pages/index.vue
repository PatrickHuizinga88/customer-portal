<script setup lang="ts">
import {Card, CardHeader, CardTitle, CardDescription} from "~/components/ui/card";
import {
  ShieldPlus,
  AlertTriangle,
  Files,
  Headset,
  ArrowRight,
  Snowflake,
  CarFront,
  Backpack,
  Home,
  Package,
  ChevronRight
} from 'lucide-vue-next';
import {Page} from "~/components/layout/page";
import {NuxtLinkLocale} from "#components";

definePageMeta({
  layout: 'default'
})

const {t} = useI18n()
const {public: {portalUrl}} = useRuntimeConfig()

const {data: profile} = await useFetch('/api/customers')

const insurances = [
  {
    icon: Home,
    name: 'Woonhuisverzekering',
    url: portalUrl
  },
  {
    icon: CarFront,
    name: 'Autoverzekering'
  },
  {
    icon: Backpack,
    name: 'Reisverzekering'
  },
  {
    icon: Package,
    name: 'Inboedelverzekering'
  },
]

const recentActivities = [
  {
    id: 1,
    icon: Headset,
    title: 'Contact met support',
    description: '5 dagen geleden'
  },
  {
    id: 2,
    icon: ShieldPlus,
    title: 'Nieuwe verzekering',
    description: '1 jaar geleden'
  },
]

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return t('home.header.title.good_morning')
  if (hour >= 12 && hour < 18) return t('home.header.title.good_afternoon')
  return t('home.header.title.good_evening')
})
</script>

<template>
  <Page :title="`${greeting}, ${profile.name || 'common.general.guest'}!`" :description="$t('home.header.description')">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <Dialog>
        <DialogTrigger as-child>
          <button
              class="w-full flex flex-col items-center gap-y-2 text-sm text-center bg-primary/10 hover:bg-primary/20 duration-150 rounded-xl border text-sm font-medium px-7 py-5">
            <ShieldPlus class="size-10 text-primary"/>
            {{ $t('home.quick_actions.new_insurance') }}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ $t('home.quick_actions.insurance_dialog.title') }}</DialogTitle>
            <DialogDescription>{{ $t('home.quick_actions.insurance_dialog.description') }}</DialogDescription>
          </DialogHeader>
          <ul class="space-y-3">
            <li v-for="insurance in insurances">
              <component :is="insurance.url ? NuxtLinkLocale : 'div'" :to="insurance.url"
                         :class="['flex justify-between items-center text-lg border p-2.5 rounded-lg hover:bg-primary/10 duration-150', {
                           'opacity-50 cursor-not-allowed': !insurance.url
                         }]">
                <div class="flex items-center font-medium">
                  <component :is="insurance.icon" class="size-6 text-primary shrink-0 mr-3"/>
                  {{ insurance.name }}
                </div>
                <ChevronRight v-if="insurance.url" class="size-4 text-muted-foreground"/>
                <div v-else class="text-xs text-muted-foreground">Nog niet beschikbaar</div>
              </component>
            </li>
          </ul>
        </DialogContent>
      </Dialog>

      <NuxtLinkLocale to="report-claim"
                      class="w-full flex flex-col items-center gap-y-2 text-sm text-center bg-primary/10 hover:bg-primary/20 duration-150 rounded-xl border text-sm font-medium px-7 py-5">
        <AlertTriangle class="size-10 text-primary"/>
        {{ $t('claims.report_a_claim') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale to="insurances"
                      class="w-full flex flex-col items-center gap-y-2 text-sm text-center bg-primary/10 hover:bg-primary/20 duration-150 rounded-xl border text-sm font-medium px-7 py-5">
        <Files class="size-10 text-primary"/>
        {{ $t('home.quick_actions.show_documents') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale to="contact"
                      class="w-full flex flex-col items-center gap-y-2 text-sm text-center bg-primary/10 hover:bg-primary/20 duration-150 rounded-xl border text-sm font-medium px-7 py-5">
        <Headset class="size-10 text-primary"/>
        {{ $t('home.quick_actions.contact_us') }}
      </NuxtLinkLocale>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-4 mb-8 md:mt-12">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{{ $t('home.recent_activities.title') }}</CardTitle>
            <CardDescription>{{ $t('home.recent_activities.description') }}</CardDescription>
          </div>
        </CardHeader>
        <ul class="space-y-1">
          <li v-for="activity in recentActivities" class="flex py-2 px-2 -mx-2">
            <component :is="activity.icon" class="size-5 text-primary"/>
            <div class="text-sm ml-3">
              <NuxtLinkLocale to="#"
                              class="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {{ activity.title }}
              </NuxtLinkLocale>
              <div class="text-muted-foreground">{{ activity.description }}</div>
            </div>
          </li>
        </ul>
      </Card>
      <div>
        <div
            class="relative bg-gradient-to-br from-primary to-primary/75 rounded-2xl rounded-b-none p-5 sm:p-6 flex flex-col gap-y-6 text-primary-foreground mt-7 md:mt-0">
          <div class="absolute right-0 -top-7" aria-hidden="true">
            <div class="relative text-[#ddd] h-20 w-[104px]">
              <Snowflake class="absolute size-16 right-0 bottom-0"/>
              <Snowflake class="absolute size-10 left-0 top-2"/>
              <Snowflake class="absolute size-4 top-0 left-10"/>
            </div>
          </div>
          <div class="space-y-3">
            <div class="pr-16">
              <h2 class="h3">Ben jij klaar voor de wintersport?</h2>
            </div>
            <p>Met onze uitgebreide reisverzekering ben je overal ter wereld gedekt tegen onverwachte kosten. Of het nu
              gaat om medische hulp, verlies van bagage of geannuleerde vluchten, wij staan voor jou klaar.</p>
          </div>
          <!--        <div class="bg-accent p-[3px] rounded-[calc(var(&#45;&#45;radius-button)+3px)]">-->
          <Button variant="ghost" size="lg" class="group bg-background text-foreground w-full" as-child>
            <NuxtLinkLocale to="#">
              Bekijk onze reisverzekering
              <ArrowRight class="size-5 group-hover:translate-x-0.5 duration-150"/>
            </NuxtLinkLocale>
          </Button>
          <!--        </div>-->
        </div>
        <p class="bg-accent text-sm text-center text-accent-foreground rounded-2xl rounded-t-none font-medium py-3">
          <strong>Actie!</strong> Ontvang tijdelijk de eerste maand gratis.
        </p>
      </div>
    </div>
  </Page>
</template>

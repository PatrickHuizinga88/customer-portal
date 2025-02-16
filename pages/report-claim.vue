<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Card} from "~/components/ui/card";
import {CarFront, Building} from "lucide-vue-next";

const recentClaims = [
  {
    icon: CarFront,
    title: 'Autoschade aan Tesla 3',
    description: '13-01-2024 op de A2',
    status: 'claimed'
  },
  // {
  //   icon: Building,
  //   title: 'Inboedelschade',
  //   description: '24-09-2020 aan Josink Hofweg 9A',
  //   status: 'claimed'
  // }
]
</script>

<template>
  <Page :title="$t('claims.header.title')" :description="$t('claims.header.description')">
    <ClaimsWizard/>
    <Card class="mt-8">
      <CardHeader>
        <div>
          <CardTitle>{{ $t('claims.recent_claims.title') }}</CardTitle>
          <CardDescription>{{ $t('claims.recent_claims.description')}}</CardDescription>
        </div>
      </CardHeader>
      <ul class="space-y-1">
        <li v-for="claim in recentClaims" class="flex py-2 px-2 -mx-2">
          <component :is="claim.icon" class="size-5 text-primary"/>
          <div class="text-sm ml-3">
            <NuxtLinkLocale to="#"
                      class="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {{ claim.title }}
            </NuxtLinkLocale>
            <div class="text-muted-foreground">{{ claim.description }}</div>
          </div>
        </li>
      </ul>
    </Card>
  </Page>
</template>

<style scoped>

</style>
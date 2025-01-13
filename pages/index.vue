<script setup lang="ts">
import { StatCard } from "~/components/ui/stat-card";
import { Card } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { ArrowRight } from 'lucide-vue-next';
import {Page} from "~/components/layout/page";

definePageMeta({
  layout: 'default-sidebar'
})

const user = useSupabaseUser()
const {locale} = useI18n()

const recentCustomers = [
  {
    id: 1,
    name: 'Leanne Graham',
    avatar: 'LG',
    date: '3 days ago'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    avatar: 'EH',
    date: '5 days ago'
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    avatar: 'CB',
    date: '2 weeks ago'
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    avatar: 'PL',
    date: '3 weeks ago'
  }
]
</script>

<template>
  <Page :title="`${$t('dashboard.welcome')}, ${user?.id || 'common.general.guest'}! 👋`">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <StatCard :title="$t('customers.customers', 2)" :stat="123" :difference="12.5" :subtitle="lowercase($t('dashboard.compared_to_last_week'))"/>
      <StatCard :title="$t('users.users', 2)" :stat="10"/>
      <StatCard :title="$t('dashboard.last_sign_in')" :stat="capitalize($dayjs(user?.last_sign_in_at).locale(locale).fromNow())"/>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
      <Card class="col-span-full xl:col-span-2 2xl:col-span-3">
        <template #header>
          <h3 class="font-medium">
            {{ $t('dashboard.revenue_history') }}
          </h3>
        </template>
        <div class="mt-5">
          <!-- TODO: Add graph -->
          <div class="flex items-center justify-center h-40 text-muted-foreground text-sm">
            {{ $t('dashboard.no_data') }}
          </div>
        </div>
      </Card>
      <Card :title="$t('dashboard.recent_registered_customers')" :description="$t('dashboard.in_the_last_30_days')" class="col-span-1 md:col-span-2 xl:col-span-1">
        <template #action>
          <Button variant="ghost" size="sm" as-child>
            <NuxtLink to="/customers">
              {{ $t('dashboard.view_all') }}
              <ArrowRight class="size-4" aria-hidden="true" />
            </NuxtLink>
          </Button>
        </template>
        <ul class="space-y-4">
          <li v-for="customer in recentCustomers" class="flex items-center">
            <Avatar>
              <AvatarFallback>{{ customer.avatar }}</AvatarFallback>
            </Avatar>
            <div class="text-sm ml-4">
              <NuxtLink :to="`/customers/${customer.id}`" class="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{{ customer.name }}</NuxtLink>
              <div class="text-muted-foreground">{{ customer.date }}</div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </Page>
</template>

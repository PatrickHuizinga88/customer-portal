<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {Download} from 'lucide-vue-next'
import {Page} from "~/components/layout/page";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const endRange = ref(8)

const showMore = () => {
  endRange.value += 8
}

const {data: invoices, status} = await useLazyAsyncData(async () => {
  try {
    const {count, data, error} = await supabase
        .from('invoices')
        .select('*', {count: 'exact'})
        .filter('user_id', 'eq', user.value?.id)
        .order('created_at', {ascending: false})
        .range(0, endRange.value)
    if (error) throw error
    return {
      data,
      count
    }
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'retrieve',
      item: t('invoices.invoices', 2)
    })
    console.error(error)
  }
}, {
  watch: [endRange]
})
</script>

<template>
  <Page :title="$t('invoices.header.title')" :description="$t('invoices.header.description')">
    <div v-if="invoices?.count">
      <ul class="space-y-3">
        <li v-for="invoice in invoices.data" :key="invoice.id" class="grid grid-cols-5 sm:grid-cols-7 items-center gap-6 bg-background border rounded-2xl py-4 px-6">
          <div class="hidden sm:font-medium sm:block sm:col-span-2">{{ $t('invoices.invoices', 1) + ' ' + invoice.id }}</div>
          <div class="font-medium sm:font-normal col-span-2">{{ capitalize($dayjs(invoice.created_at).locale('nl').format('MMMM YYYY')) }}</div>
          <div class="col-span-2">{{ formattedPrice(invoice.price) }}</div>
          <div class="text-right">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon">
                    <Download/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {{ $t('invoices.download_invoice') }}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </li>
      </ul>

      <div class="flex justify-center mt-8">
        <Button v-if="invoices.count > endRange" variant="outline" @click="showMore" class="w-full sm:w-auto">{{ $t('invoices.show_more') }}</Button>
      </div>
    </div>

    <div v-else-if="status === 'pending'" class="space-y-3">
      <Skeleton v-for="item in 5" class="h-[72px]"/>
    </div>

    <div v-else class="w-full text-center">{{
        $t('common.general.no_records_found', {item: lowercase($t('invoices.invoices', 2))})
      }}
    </div>
  </Page>
</template>

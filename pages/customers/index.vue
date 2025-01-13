<script setup lang="ts">
import {PlusCircle} from 'lucide-vue-next'
// import type {Database} from "~/types/database.types";
import {Page, PageActions, PageHeader} from "~/components/layout/page";
import {SkeletonTable} from "~/components/ui/skeleton";

definePageMeta({
  layout: 'default-sidebar',
})

// const supabase = useSupabaseClient<Database>()

// const {data: customers, status} = useAsyncData(async () => {
//   const {data} = await supabase.from('customers').select('*')
//   return data
// })

const {data: customers, status} = useLazyFetch('/api/customers', {
  transform: (data) => {
    return data.slice(0, 10)
  }
})
</script>

<template>
  <Page :title="$t('customers.customers', 2)">
    <PageHeader class="justify-end">
      <PageActions>
        <Button size="sm" as-child>
          <NuxtLink to="/customers/create">
            <PlusCircle class="size-4"/>
            {{ $t('common.actions.add', {item: lowercase($t('customers.customers'))}) }}
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>

    <div v-if="customers?.length" class="flow-root">
      <div class="-mx-6 -my-2 overflow-x-auto lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md shadow-black/5 border border-border sm:rounded-2xl">
            <table class="min-w-full divide-y divide-border">
              <thead class="bg-muted">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                  {{ $t('common.general.name') }}
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">{{
                    $t('customers.address')
                  }}
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">{{ $t('common.actions.edit') }}</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
              <tr v-for="customer in customers" :key="customer.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium truncate sm:pl-6 max-w-[320px]">
                  <NuxtLink :to="`/customers/${customer.id}`" class="truncate">
                    <template v-if="customer.name">
                      {{ customer.name }}
                    </template>
                    <template v-else>-</template>
                  </NuxtLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
<!--                  <a :href="`mailto:${customer.email}`">{{ customer.email || '-' }}</a>-->
                  {{ customer.primary_address.streetandnumber }}
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <NuxtLink :to="`/customers/${customer.id}/edit`" class="text-primary hover:underline">
                    {{ $t('common.actions.edit') }}<span
                      class="sr-only">, {{ customer.first_name + ' ' + customer.last_name }}</span>
                  </NuxtLink>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <template v-else-if="status === 'pending'">
      <SkeletonTable :columns="2"/>
    </template>
    <div v-else class="w-full text-center">{{
        $t('common.general.no_records_found', {item: $t('customers.customers', 2)})
      }}
    </div>
  </Page>
</template>

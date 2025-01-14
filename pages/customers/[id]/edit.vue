<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {Page} from "~/components/layout/page";

definePageMeta({
  layout: 'default'
})

const supabase = useSupabaseClient<Database>()

const {data: customer} = await useAsyncData(async () => {
  const {data} = await supabase.from('customers').select('*').filter('id', 'eq', useRoute().params.id).single()
  return data
})
</script>

<template>
  <Page :title="`${customer.first_name} ${customer.last_name}`">
    <FormCustomer v-if="customer" :customer="customer"/>
    <p v-else>{{ $t('not_found', {item: $t('customers.customers')}) }}</p>
  </Page>
</template>

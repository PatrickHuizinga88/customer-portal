<script setup lang="ts">
import {Trash, Pencil} from 'lucide-vue-next'
import {useNotificationStore} from "~/stores/notificationStore";
import {Card} from "~/components/ui/card";
import type {Database} from "~/types/database.types";
import {Page, PageActions, PageBackButton, PageHeader} from "~/components/layout/page";

definePageMeta({
  layout: 'default-sidebar',
})

const supabase = useSupabaseClient<Database>()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const dialogOpen = ref(false)
const loadingDelete = ref(false)

const {data: customer, status} = await useAsyncData(async () => {
  const {data} = await supabase.from('customers').select('*').filter('id', 'eq', useRoute().params.id).single()
  return data
})

const deleteCustomer = async () => {
  try {
    loadingDelete.value = true
    await useAsyncData(async () => {
      const { data, error } = await supabase.from('customers').delete().filter('id', 'eq', useRoute().params.id)
      if (error) console.error(error)
      return data
    })

    notificationStore.createNotification({
      type: 'success',
      action: 'delete',
      item: `${customer.value?.first_name} ${customer.value?.last_name}` || t('customers.customers'),
    })
    navigateTo('/customers')
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'delete',
      item: `${customer.value?.first_name} ${customer.value?.last_name}` || t('customers.customers'),
    })
    console.error(error)
  } finally {
    loadingDelete.value = false
  }
}
</script>

<template>
  <Page :title="`${customer?.first_name} ${customer?.last_name}` || $t('customers.customers')" :customBreadcrumb="true">
    <PageHeader>
      <PageBackButton to="/customers" :label="$t('common.actions.back_to', {item: lowercase($t('customers.customers', 2))})"/>
      <PageActions>
        <Dialog v-model:open="dialogOpen">
          <DialogTrigger as-child>
            <Button
                variant="outline"
                size="sm"
            >
              <Trash class="size-4" aria-hidden="true"/>
              {{ $t('common.actions.delete') }}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{{ $t('common.actions.delete', {item: `${customer?.first_name} ${customer?.last_name}` || $t('customers.customers')}) }}</DialogTitle>
              <DialogDescription>
                {{ $t('common.actions.delete_confirmation', {item: $t('customers.customers')}) }}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                  variant="outline"
                  @click="dialogOpen = false"
              >
                {{ $t('common.actions.cancel') }}
              </Button>
              <Button
                  variant="destructive"
                  @click="deleteCustomer"
              >
                {{ $t('common.actions.delete') }}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
            size="sm"
            asChild
        >
          <NuxtLink :to="`/customers/${customer.id}/edit`">
            <Pencil class="size-4" aria-hidden="true"/>
            {{ $t('common.actions.edit') }}
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="col-span-1">
        <Card :title="$t('customers.general_information')">
          <dl class="space-y-4">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.name') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                <template v-if="customer?.first_name || customer?.last_name">
                  {{ `${customer?.first_name} ${customer?.last_name}` }}
                </template>
                <template v-else>-</template>
              </dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.email') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{
                  customer.email || '-'
                }}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
      <div>

      </div>
    </div>

  </Page>
</template>

<script setup lang="ts">
import {Trash, Pencil} from 'lucide-vue-next'
import {useNotificationStore} from "~/stores/notificationStore";
import {Card} from "~/components/ui/card";
import type User from "~/types/User";
import {Page, PageActions, PageBackButton, PageHeader} from "~/components/layout/page";

definePageMeta({
  layout: 'default-sidebar',
})

const notificationStore = useNotificationStore()
const {t} = useI18n()

const dialogOpen = ref(false)

// TODO: Get users from Supabase
const {data: user} = await useFetch<User>('/api/users', {
  query: {
    id: useRoute().params.id
  }
})

const deleteUser = async () => {
  try {

    // Delete user

    notificationStore.createNotification({
      type: 'success',
      action: 'delete',
      item: user.value?.name || t('users.users'),
    })
    navigateTo('/users')
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'delete',
      item: user.value?.name || t('users.users'),
    })
    console.error(error)
  }
}
</script>

<template>
  <Page :title="user.name || `${$t('users.users')} ${user.id}`">
    <PageHeader>
      <PageBackButton to="/users" :label="$t('common.actions.back_to', {item: lowercase($t('users.users', 2))})"/>
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
              <DialogTitle>{{ $t('common.actions.delete', {item: user.name || $t('users.users')}) }}</DialogTitle>
              <DialogDescription>
                {{ $t('common.actions.delete_confirmation', {item: $t('users.users')}) }}
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
                  @click="deleteUser"
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
          <NuxtLink :to="`/users/${user.id}/edit`">
            <Pencil class="size-4" aria-hidden="true"/>
            {{ $t('common.actions.edit') }}
          </NuxtLink>
        </Button>
      </PageActions>
    </PageHeader>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="col-span-1">
        <Card :title="$t('users.general_information')">
          <dl class="space-y-4">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.name') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.name || '-' }}</dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.email') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{
                  user.email || '-'
                }}
              </dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('users.role') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.role || '-' }}</dd>
            </div>
          </dl>
        </Card>
      </div>
      <div>

      </div>
    </div>

  </Page>
</template>

<script setup lang="ts">
import { Home, IdCard, LogOut, Users, Settings } from "lucide-vue-next";

const supabase = useSupabaseClient()
const {t} = useI18n()
const route = useRoute()

const navigation = [
  {
    name: t('common.general.general'),
    links: [
      { name: t('common.general.dashboard'), url: '/', icon: Home },
      { name: t('customers.customers', 2), url: 'customers', icon: IdCard },
      { name: t('users.users', 2), url: 'users', icon: Users },
      { name: t('settings.settings', 2), url: 'settings', icon: Settings },
    ]
  }
]

const isCurrentOrChildRoute = (path: string) => {
  return {
    'bg-foreground/5': route.fullPath.startsWith('/' + path)
  }
}

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    await navigateTo('/login')
  }
}
</script>

<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col divide-y divide-border">
      <li v-for="category in navigation" :key="category.name" class="py-7 first:pt-0">
        <div class="text-xs leading-6 text-muted-foreground">{{ category.name }}</div>
        <ul role="list" class="-mx-2 mt-4 space-y-1">
          <li v-for="link in category.links" :key="link.name">
            <Button as-child variant="ghost" class="w-full justify-start hover:bg-foreground/5 p-2">
              <NuxtLinkLocale :href="link.url" active-class="bg-foreground/5" :class="isCurrentOrChildRoute(link.url)">
                <component :is="link.icon" class="size-5 shrink-0" aria-hidden="true" />
                <span class="truncate">{{ link.name }}</span>
              </NuxtLinkLocale>
            </Button>
          </li>
        </ul>
      </li>
    </ul>

    <ul role="list" class="-mx-2 mt-auto space-y-1">
      <li>
        <Button @click="signOut" variant="ghost" class="w-full justify-start">
          <LogOut class="size-5 shrink-0" aria-hidden="true" />
          {{ t('authentication.common.sign_out') }}
        </Button>
      </li>
    </ul>
  </nav>
</template>
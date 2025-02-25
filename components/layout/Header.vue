<script setup lang="ts">
import {Bell, Menu} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import type {Database} from "~/types/database.types";
import {VisuallyHidden} from "reka-ui";

defineProps<{
  logoUrl?: string
  companyName: string
  mainNavItems: {
    name: string,
    url: string
  }[]
  userNavItems: {
    name: string,
    url?: string
    icon: any
  }[]
}>()

const supabase = useSupabaseClient<Database>()

const open = ref(false)

const notifications = []

const {data: profile} = await useFetch('/api/customers', {
  pick: ['name']
})

const initials = computed(() => {
  if (!profile.value) return ''
  return profile.value.name.split(' ').map((name) => name.charAt(0)).join('')
})

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    await navigateTo('/login')
  }
}

watch(useRoute(), () => {
  open.value = false
})
</script>

<template>
  <header class="flex items-center bg-background/80 border-b border-border h-16 backdrop-blur z-10">
    <div class="container">
      <nav class="flex justify-between items-center">
        <div class="flex gap-8 items-center">
          <NuxtLinkLocale to="/">
            <img :src="logoUrl" :alt="companyName" class="h-9">
          </NuxtLinkLocale>
          <ul class="hidden md:flex gap-4">
            <li v-for="item in mainNavItems">
              <NuxtLinkLocale :to="item.url" activeClass="bg-muted"
                        class="inline-block px-2 py-1.5 rounded-md text-sm font-medium hover:bg-muted duration-150">
                {{ item.name }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
        <div class="flex gap-1 md:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon">
                <Bell class="size-4 text-muted-foreground"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-80">
              <DropdownMenuLabel>{{ $t('common.notifications.notifications', 2) }}</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <template v-if="notifications.length">
                  <DropdownMenuItem v-for="notification in notifications">
                    <div class="flex flex-col">
                      <h3 class="text-sm font-semibold">{{ notification.title }}</h3>
                      <p class="text-xs text-muted-foreground">{{ notification.description }}</p>
                    </div>
                  </DropdownMenuItem>
                </template>
                <div v-else class="text-sm text-muted-foreground px-2 py-2">{{
                    $t('common.general.no_records_found', {item: lowercase($t('common.notifications.notifications', 2))})
                  }}
                </div>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger class="hidden md:block rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Avatar>
                <AvatarFallback>{{ initials }}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem v-for="item in userNavItems" @click="!item.url ? signOut() : null" :asChild="item.url !== undefined">
                <NuxtLinkLocale v-if="item.url" :to="item.url">
                  <component :is="item.icon" class="size-4"/>
                  <span>{{ item.name }}</span>
                </NuxtLinkLocale>
                <template v-else>
                  <component :is="item.icon" class="size-4"/>
                  <span>{{ item.name }}</span>
                </template>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet v-model:open="open">
            <SheetTrigger class="md:hidden" as-child>
              <Button variant="ghost" size="icon">
                <Menu class="size-7"/>
              </Button>
            </SheetTrigger>
            <SheetContent class="flex flex-col justify-center" aria-description="Main navigation">
              <VisuallyHidden>
                <SheetTitle>{{ $t('common.accessibility.main_menu.title') }}</SheetTitle>
                <SheetDescription>{{ $t('common.accessibility.main_menu.description') }}</SheetDescription>
              </VisuallyHidden>
              <ul class="flex flex-col align-stretch gap-4">
                <li v-for="item in mainNavItems">
                  <NuxtLinkLocale :to="item.url" activeClass="text-primary"
                            class="inline-block px-2 py-1 text-2xl font-semibold text-right rounded hover:bg-muted duration-150">
                    {{ item.name }}
                  </NuxtLinkLocale>
                </li>
                <li v-for="item in userNavItems">
                  <NuxtLinkLocale v-if="item.url" :to="item.url" activeClass="text-primary-dark"
                            class="inline-block px-2 py-1 text-2xl font-semibold text-right rounded hover:bg-muted duration-150">
                    {{ item.name }}
                  </NuxtLinkLocale>
                  <button v-else @click="signOut"
                          class="inline-block px-2 py-1 text-2xl font-semibold text-right rounded hover:bg-muted duration-150">
                    {{ item.name }}
                  </button>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>
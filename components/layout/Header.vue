<script setup lang="ts">
import {LogOut, Bell, User, Menu} from 'lucide-vue-next'
import {APP_NAME} from "~/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import type {Database} from "~/types/database.types";

defineProps<{
  logoUrl: string
  companyName: string
}>()

const supabase = useSupabaseClient<Database>()
const {t} = useI18n()

const open = ref(false)

const mainNavItems = [
  {name: t('home.home'), url: '/'},
  {name: t('insurances.my_insurances'), url: '/insurances'},
  {name: t('claims.report_a_claim'), url: '/report-claim'},
  {name: t('contact.contact'), url: '/contact'},
]

const secondaryNavItems = [
  {name: t('common.notifications.notifications', 2), icon: Bell},
]

const userNavItems = [
  {name: t('profile.my_profile'), url: '/profile', icon: User},
  {name: t('authentication.common.sign_out'), icon: LogOut},
]

const notifications = []

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
  <header class="sticky top-0 flex items-center bg-background/80 border-b border-border h-16 backdrop-blur z-10">
    <div class="container">
      <nav class="flex justify-between items-center">
        <div class="flex gap-8 items-center">
          <NuxtLink to="/">
            <img :src="logoUrl" :alt="companyName" class="h-9">
          </NuxtLink>
          <ul class="hidden md:flex gap-4">
            <li v-for="item in mainNavItems">
              <NuxtLink :to="item.url" activeClass="text-primary bg-muted"
                        class="inline-block px-2 py-1.5 rounded-md text-sm font-medium hover:bg-muted duration-150">
                {{ item.name }}
              </NuxtLink>
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
            <DropdownMenuTrigger class="hidden md:block">
              <Avatar>
                <AvatarFallback>PH</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem v-for="item in userNavItems" @click="!item.url ? signOut() : null" :asChild="item.url !== undefined">
                <NuxtLink v-if="item.url" to="/profile">
                  <component :is="item.icon" class="size-4"/>
                  <span>{{ item.name }}</span>
                </NuxtLink>
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
            <SheetContent class="flex flex-col justify-center">
              <ul class="flex flex-col align-stretch gap-4">
                <li v-for="item in mainNavItems">
                  <NuxtLink :to="item.url" activeClass="text-primary"
                            class="inline-block px-2 py-1 text-2xl font-semibold text-right rounded hover:bg-muted duration-150">
                    {{ item.name }}
                  </NuxtLink>
                </li>
                <li v-for="item in userNavItems">
                  <NuxtLink v-if="item.url" :to="item.url" activeClass="text-primary"
                            class="inline-block px-2 py-1 text-2xl font-semibold text-right rounded hover:bg-muted duration-150">
                    {{ item.name }}
                  </NuxtLink>
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
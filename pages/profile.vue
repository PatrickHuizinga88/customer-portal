<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Pencil, User, Wallet, Settings, Mail, MonitorCog} from "lucide-vue-next";
import {DescriptionItem} from "~/components/ui/description-item";

const notificationStore = useNotificationStore()
const {t} = useI18n()

const fallBackProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone_number: '+1234567890',
  address: '1234 Elm Street',
  account_number: '1234567890'
}

const profileEditable = ref(false)
const preferencesEditable = ref(false)

const { locale, locales } = useI18n()
const localeName = locales.value.find((l) => l.code === locale.value)?.name

const {data: profile} = await useFetch('/api/customers')

onMounted(() => {
  if (useRoute().query.refresh) {
    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: t('profile.preferences')
    })
  }
})
</script>

<template>
  <Page :title="$t('profile.header.title')" :description="$t('profile.header.description')">
    <div class="space-y-10">
      <Card>
        <div class="flex items-center mb-6">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <User class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.personal_details') }}</h2>
        </div>
        <template v-if="!profileEditable">
          <dl class="space-y-4">
            <DescriptionItem :label="$t('profile.name')" :value="profile?.name || fallBackProfile.name"/>
            <DescriptionItem :label="$t('profile.phone')" :value="profile?.telephone || fallBackProfile.email"/>
            <DescriptionItem :label="$t('profile.address')" :value="`${profile.primary_address.streetandnumber}, ${profile.primary_address.postalcode} ${profile.primary_address.city}`"/>
          </dl>
          <Button @click="profileEditable = true" variant="outline" class="w-full sm:w-auto mt-4">
            <Pencil/>
            {{ capitalizeSentence($t('common.actions.edit_item', {item: $t('profile.personal_details')})) }}
          </Button>
        </template>
        <FormPersonalInformation v-else :profile="profile" @toggleEditable="profileEditable = false"/>
      </Card>

      <Card>
        <div class="flex items-center mb-6">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <Settings class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.account_settings') }}</h2>
        </div>
        <FormAccount :email="profile?.email || fallBackProfile.email"/>
<!--        <Button variant="outline" class="w-full sm:w-auto mt-2">-->
<!--          <Pencil class="size-5"/>-->
<!--          {{ capitalizeSentence($t('common.actions.edit_item', {item: $t('profile.account_settings')})) }}-->
<!--        </Button>-->
      </Card>

      <Card>
        <div class="flex items-center mb-6">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <Wallet class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.payment_details') }}</h2>
        </div>
        <dl class="space-y-4">
          <DescriptionItem :label="$t('profile.account_number')" :value="profile?.bankaccount || fallBackProfile.account_number"/>
        </dl>
        <Button variant="outline" class="w-full sm:w-auto mt-4">
          <Pencil/>
          {{ capitalizeSentence($t('common.actions.edit_item', {item: $t('profile.payment_details')})) }}
        </Button>
      </Card>

      <Card>
        <div class="flex items-center mb-6">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <MonitorCog class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.preferences') }}</h2>
        </div>
        <template v-if="!preferencesEditable">
          <dl class="space-y-4">
            <DescriptionItem :label="$t('profile.language')" :value="localeName"/>
          </dl>
          <Button @click="preferencesEditable = true" variant="outline" class="w-full sm:w-auto mt-4">
            <Pencil/>
            {{ capitalizeSentence($t('common.actions.edit_item', {item: $t('profile.preferences')})) }}
          </Button>
        </template>
        <FormPreferences v-else @toggleEditable="profileEditable = false"/>
      </Card>

      <Card>
        <div class="flex items-center mb-6">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <Mail class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.communication_preferences') }}</h2>
        </div>
        <dl class="space-y-4">
          <div class="w-full h-16 bg-muted rounded"></div>
        </dl>
      </Card>

    </div>
  </Page>
</template>

<style scoped>

</style>
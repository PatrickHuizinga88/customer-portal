<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {Pencil, User, Wallet, Settings, Mail} from "lucide-vue-next";

const fallBackProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone_number: '+1234567890',
  address: '1234 Elm Street',
  account_number: '1234567890'
}

const {data: profile} = useFetch('http://localhost:3001/customers', {
  query: {
    id: 1
  },
  transform: (data) => {
    return data.response
  }
})
</script>

<template>
  <Page :title="$t('profile.header.title')" :description="$t('profile.header.description')">
    <div class="space-y-10">
      <div>
        <div class="flex items-center mb-4">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <User class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.personal_details') }}</h2>
        </div>
        <dl class="space-y-4">
          <div>
            <dt>{{ $t('profile.name') }}</dt>
            <dd class="font-medium">{{ profile.name || fallBackProfile.name  }}</dd>
          </div>
          <div>
            <dt>{{ $t('profile.email') }}</dt>
            <dd class="font-medium">{{ profile.email || fallBackProfile.email }}</dd>
          </div>
          <div>
            <dt>{{ $t('profile.phone') }}</dt>
            <dd class="font-medium">{{ profile.phone_number || fallBackProfile.phone_number }}</dd>
          </div>
          <div>
            <dt>{{ $t('profile.address') }}</dt>
            <dd class="font-medium">
              <template v-if="profile.primary_address">
                {{ `${profile.primary_address.streetandnumber}, ${profile.primary_address.postalcode} ${profile.primary_address.city}` }}
              </template>
              <template v-else>{{fallBackProfile.address }}</template>
            </dd>
          </div>
        </dl>
        <Button variant="outline" class="w-full mt-4">
          <Pencil class="size-5"/>
          {{ $t('profile.edit_personal_details') }}
        </Button>
      </div>

      <div>
        <div class="flex items-center mb-4">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <Wallet class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.payments') }}</h2>
        </div>
        <dl class="space-y-4">
          <div>
            <dt>{{ $t('profile.account_number') }}</dt>
            <dd class="font-medium">{{ profile.account_number || fallBackProfile.account_number }}</dd>
          </div>
        </dl>
        <Button variant="outline" class="w-full mt-4">
          <Pencil class="size-5"/>
          {{ $t('profile.edit_payment_method') }}
        </Button>
      </div>

      <div>
        <div class="flex items-center mb-4">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <Mail class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.communication_preferences') }}</h2>
        </div>
        <dl class="space-y-4">
          <div class="w-full h-16 bg-muted rounded"></div>
        </dl>
      </div>

      <div>
        <div class="flex items-center mb-4">
          <div class="bg-primary/10 rounded-lg p-1.5 mr-3">
            <Settings class="size-6 text-primary"/>
          </div>
          <h2 class="h4">{{ $t('profile.account_settings') }}</h2>
        </div>
        <dl class="space-y-4">
          <div>
            <dt>{{ $t('authentication.common.password') }}</dt>
            <dd class="font-medium">
              <span aria-hidden="true">··············</span>
              <span class="sr-only">{{ $t('profile.password_placeholder') }}</span>
            </dd>
          </div>
        </dl>
        <Button variant="outline" class="w-full mt-4">
          <Pencil class="size-5"/>
          {{ $t('profile.edit_password') }}
        </Button>
      </div>
    </div>
  </Page>
</template>

<style scoped>

</style>
<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {Loader2} from 'lucide-vue-next'
import Authentication from "~/layouts/authentication.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from 'zod'
import {useForm} from "vee-validate";

definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const {error} = await supabase
        .from('profiles')
        .upsert({
          id: user.value?.id,
          first_name: values.first_name,
          last_name: values.last_name,
        }, {
          onConflict: 'id'
        })
    if (error) throw error

    // TODO: Create external user

    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: t('profiles.profiles'),
    })
    navigateTo('/')
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save',
      item: t('profiles.profiles'),
    })
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Authentication :title="'Welkom bij Lapzy!'" description="Laten we beginnen met het aanmaken van je profiel.">
    <form @submit="onSubmit" class="space-y-6">
      <section id="profile-settings" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="first_name">
            <FormItem>
              <FormLabel>{{ $t('profile.first_name') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField"/>
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="last_name">
            <FormItem>
              <FormLabel>{{ $t('profile.last_name') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField"/>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </section>

      <div class="space-y-4">
        <Button type="submit" class="w-full" :disabled="loading">
          <Loader2 v-if="loading" class="size-5 animate-spin"/>
          {{ $t('common.actions.save') }}
        </Button>
        <Button variant="outline" type="button" class="w-full" :disabled="loading" as-child>
          <NuxtLinkLocale to="/">
            {{ $t('common.actions.skip') }}
          </NuxtLinkLocale>
        </Button>
      </div>
    </form>
  </Authentication>
</template>

<style scoped>

</style>
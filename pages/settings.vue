<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {Loader2} from "lucide-vue-next";
import {Page} from "~/components/layout/page";

definePageMeta({
  layout: 'default'
})

const notificationStore = useNotificationStore()
const colorMode = useColorMode()
const {t, locale, locales, setLocale} = useI18n()
const router = useRouter()

const loading = ref(false)

const themeOptions = [{
  value: 'light',
  label: t('settings.themes.light')
}, {
  value: 'dark',
  label: t('settings.themes.dark')
}, {
  value: 'system',
  label: t('settings.themes.system_default')
}]

const languageOptions =
    locales.value.map(locale => ({
      value: locale.code,
      label: locale.name
    }))

const formSchema = toTypedSchema(z.object({
  theme: z.string(),
  language: z.enum(['en', 'nl'])
}))

const form = useForm({
  initialValues: {
    theme: colorMode.preference,
    language: locale.value
  },
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true
  colorMode.preference = values.theme
  await setLocale(values.language)
  await router.push({
    query: {refresh: 'true'}
  })
  location.reload()
})

onMounted(() => {
  if (useRoute().query.refresh) {
    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: t('settings.settings', 2)
    })
  }
})
</script>

<template>
  <Page :title="$t('settings.settings', 2)">
    <form @submit="onSubmit" class="space-y-6">
      <FormField v-slot="{ componentField }" name="theme">
        <FormItem>
          <FormLabel>{{ $t('settings.theme') }}</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue :placeholder="$t('settings.select_a_theme')"/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem v-for="option in themeOptions" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="language">
        <FormItem>
          <FormLabel>{{ $t('settings.language') }}</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue :placeholder="$t('settings.select_a_language')"/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem v-for="option in languageOptions" :value="option.value">
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      </FormField>
      <Button>
        <Loader2 v-if="loading" class="size-5 animate-spin"/>
        {{ $t('common.actions.save', {item: lowercase($t('settings.settings', 2))}) }}
      </Button>
    </form>
  </Page>
</template>

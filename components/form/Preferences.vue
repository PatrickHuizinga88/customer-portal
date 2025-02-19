<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";

const loading = ref(false)

const {locale, locales, setLocale} = useI18n()
const router = useRouter()

const languageOptions =
    locales.value.map(locale => ({
      value: locale.code,
      label: locale.name
    }))

const formSchema = toTypedSchema(z.object({
  language: z.enum(['en', 'nl']),
}))

const form = useForm({
  initialValues: {
    language: locale.value,
  },
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true

    await setLocale(values.language)
    await router.push({
      query: {refresh: 'true'}
    })
    location.reload()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const emit = defineEmits(['toggleEditable'])
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="language">
      <FormItem>
        <FormLabel>{{ $t('profile.language') }}</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue :placeholder="$t('profile.select_a_language')"/>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="option in languageOptions" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormMessage/>
      </FormItem>
    </FormField>
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-4">
      <Button type="submit" class="w-full sm:w-auto">
        {{ $t('common.actions.save') }}
      </Button>
      <Button @click="emit('toggleEditable')" variant="outline" class="w-full sm:w-auto">
        {{ $t('common.actions.cancel') }}
      </Button>
      <p class="text-sm text-muted-foreground">{{ $t('profile.refresh_page') }}</p>
    </div>
  </form>
</template>

<style scoped>

</style>
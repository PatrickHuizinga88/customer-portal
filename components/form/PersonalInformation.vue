<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {Info} from 'lucide-vue-next'

const props = defineProps<{
  profile: any // TODO: Define profile type
}>()

const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  phone_number: z.string().min(10),
  street_and_number: z.string(),
  postal_code: z.string(),
  city: z.string()
}))

const form = useForm({
  initialValues: {
    name: props.profile.name,
    phone_number: props.profile.telephone,
    street_and_number: props.profile.primary_address.streetandnumber,
    postal_code: props.profile.primary_address.postalcode,
    city: props.profile.primary_address.city
  },
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true

    console.log(values) // TODO: Update profile

    emit('toggleEditable')
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
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t('profile.name') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phone_number">
      <FormItem>
        <FormLabel>{{ $t('profile.phone') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Alert variant="info">
      <Info class="size-4"/>
      <AlertTitle>{{ $t('profile.change_address.title') }}</AlertTitle>
      <AlertDescription>{{ $t('profile.change_address.description') }}</AlertDescription>
    </Alert>
<!--    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">-->
<!--      <FormField v-slot="{ componentField }" name="street_and_number">-->
<!--        <FormItem class="col-span-2">-->
<!--          <FormLabel>{{ $t('profile.street_and_number') }}</FormLabel>-->
<!--          <FormControl>-->
<!--            <Input v-bind="componentField"/>-->
<!--          </FormControl>-->
<!--          <FormMessage/>-->
<!--        </FormItem>-->
<!--      </FormField>-->
<!--      <FormField v-slot="{ componentField }" name="postal_code">-->
<!--        <FormItem>-->
<!--          <FormLabel>{{ $t('profile.postal_code') }}</FormLabel>-->
<!--          <FormControl>-->
<!--            <Input v-bind="componentField"/>-->
<!--          </FormControl>-->
<!--          <FormMessage/>-->
<!--        </FormItem>-->
<!--      </FormField>-->
<!--      <FormField v-slot="{ componentField }" name="city">-->
<!--        <FormItem class="col-span-2 sm:col-span-1">-->
<!--          <FormLabel>{{ $t('profile.city') }}</FormLabel>-->
<!--          <FormControl>-->
<!--            <Input v-bind="componentField"/>-->
<!--          </FormControl>-->
<!--          <FormMessage/>-->
<!--        </FormItem>-->
<!--      </FormField>-->
<!--    </div>-->

    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
      <Button type="submit" class="w-full sm:w-auto">
        {{ $t('common.actions.save') }}
      </Button>
      <Button @click="emit('toggleEditable')" variant="outline" class="w-full sm:w-auto">
        {{ $t('common.actions.cancel') }}
      </Button>
    </div>
  </form>
</template>

<style scoped>

</style>
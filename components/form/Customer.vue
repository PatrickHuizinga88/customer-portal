<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {LoaderCircle} from "lucide-vue-next";
import type {Database, Tables} from "~/types/database.types";

const props = defineProps<{
  customer?: Tables<'customers'>
}>()

const notificationStore = useNotificationStore()
const supabase = useSupabaseClient<Database>()

const formSchema = toTypedSchema(z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
}))

const form = useForm({
  initialValues: {
    firstName: props.customer?.first_name,
    lastName: props.customer?.last_name,
    email: props.customer?.email,
    phoneNumber: props.customer?.phone_number,
    address: props.customer?.address,
    postal_code: props.customer?.postal_code,
    city: props.customer?.city,
    country: props.customer?.country,
  },
  validationSchema: formSchema,
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    const {data, error} = await supabase.from('customers').upsert({
      id: props.customer?.id,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      address: values.address,
      postal_code: values.postal_code,
      city: values.city,
      country: values.country,
    }, {
      onConflict: 'id'
    }).select()
    if (error) throw error
    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: `${values.firstName} ${values.lastName}`
    })
    navigateTo(`/customers/${data[0].id}`)
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save',
      item: `${values.firstName} ${values.lastName}`
    })
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="grid sm:grid-cols-2 gap-6">
      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel>{{ $t('customers.first_name') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>{{ $t('customers.last_name') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
    <div class="grid sm:grid-cols-2 gap-6">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>{{ $t('common.general.email') }}</FormLabel>
          <FormControl>
            <Input type="email" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="phoneNumber">
        <FormItem>
          <FormLabel>{{ $t('customers.phone_number') }}</FormLabel>
          <FormControl>
            <Input type="tel" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>{{ $t('customers.address') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <div class="grid sm:grid-cols-2 gap-6">
      <FormField v-slot="{ componentField }" name="city">
        <FormItem>
          <FormLabel>{{ $t('customers.city') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="country">
        <FormItem>
          <FormLabel>{{ $t('customers.country') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
    <div class="grid sm:grid-cols-2 gap-6">
      <FormField v-slot="{ componentField }" name="state">
        <FormItem>
          <FormLabel>{{ $t('customers.state') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="postalCode">
        <FormItem>
          <FormLabel>{{ $t('customers.postal_code') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>

    <Button :disabled="loading" class="w-full lg:w-auto">
      <LoaderCircle v-if="loading" class="size-5 animate-spin"/>
      {{ $t('common.actions.save', {item: lowercase($t('customers.customers'))}) }}
    </Button>
  </form>
</template>
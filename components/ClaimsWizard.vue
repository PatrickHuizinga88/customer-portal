<script setup lang="ts">
import {ArrowLeft, ArrowRight, Building, CarFront} from "lucide-vue-next";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

const currentStep = ref(1)

const fallbackObjects = [
  {
    id: 1,
    type: 'car',
    object_name: 'Tesla Model Y',
    object_details: 'BC-123-D',
  },
  {
    id: 2,
    type: 'business_premises',
    object_name: 'Bedrijfspand',
    object_details: 'Josink Hofweg 9A, 7545 PP Enschede',
  }
]

const {data: objects, status} = await useLazyFetch('/api/customers', {
  transform: (data) => {
    if (!data.objects) return fallbackObjects
    return data.objects.map((object: any) => {
      object.object_name = object.object_name.split(' - ')[0]
      object.object_details = object.object_details.split(' - ')[1] || 'BC-123-D'
      return object
    })
  }
})

const objectIcon = (type: string) => {
  switch (type) {
    case 'Motorvoertuig':
      return CarFront
    case 'business_premises':
      return Building
  }
}

const formSchema = toTypedSchema(z.object({
  object: z.string(),
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(() => {
  currentStep.value++
})
</script>

<template>
  <div class="wizard relative bg-muted py-10 min-[1400px]:after:rounded-2xl after:w-screen min-[1400px]:after:w-[calc(100%+4rem)]">
    <form @submit="onSubmit">
      <div v-if="currentStep === 1" class="space-y-8">
        <h2>{{ $t('claims.wizard.questions.object') }}</h2>
        <FormField v-slot="{ field }" name="object">
          <FormItem class="grid md:grid-cols-2 gap-3 space-y-0">
            <template v-if="status === 'pending'">
              <Skeleton class="h-20 w-full bg-muted-foreground/10"/>
              <Skeleton class="h-20 w-full bg-muted-foreground/10"/>
            </template>
            <FormControl v-else>
              <FormItem v-for="object in objects" class="relative space-y-0">
                <FormControl>
                  <input v-bind="field" type="radio" :value="object.guid"
                         class="peer absolute right-4 top-1/2 -translate-y-1/2"/>
                </FormControl>
                <FormLabel
                    class="bg-background flex items-center rounded-lg border h-full p-3 pr-8 cursor-pointer transition-[background-color] duration-200 hover:bg-background/90 peer-focus-visible:bg-muted peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary">
                  <div class="p-2 bg-primary/10 text-primary rounded-lg mr-3">
                    <component v-if="object.type" :is="objectIcon(object.type)" class="size-10"/>
                  </div>
                  <div>
                    <span class="block h4 font-medium">{{ object.object_name }}</span>
                    <p v-if="object.object_details" class="text-sm text-muted-foreground">{{
                        object.object_details
                      }}</p>
                  </div>
                </FormLabel>
              </FormItem>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
      </div>
      <div v-else-if="currentStep === 2" class="space-y-8">
        <h2>{{ $t('claims.wizard.questions.time_and_location') }}</h2>
      </div>
      <div class="flex gap-3 mt-8">
        <Button v-if="currentStep > 1" @click="currentStep--" type="button" variant="outline" size="icon-lg"
                class="shrink-0" :aria-label="$t('claims.wizard.previous_step')">
          <ArrowLeft class="size-5"/>
        </Button>
        <Button type="submit" size="lg" class="w-full">
          {{ currentStep === 1 ? $t('claims.wizard.continue') : $t('claims.wizard.next_step') }}
          <ArrowRight class="size-5"/>
        </Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wizard::after {
  content: '';
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: hsl(var(--muted));
  z-index: -10;
}
</style>
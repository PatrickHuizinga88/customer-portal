<script setup lang="ts">
import {ArrowLeft, ArrowRight} from "lucide-vue-next";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

const currentStep = ref(1)

const objects = [{
  id: 1,
  type: 'car',
  object_name: 'Tesla Model Y',
  object_details: 'BC-123-D',
}, {
  id: 2,
  type: 'business_premises',
  object_name: 'Bedrijfspand',
  object_details: 'Josink Hofweg 9A, 7545 PP Enschede',
}]

const formSchema = toTypedSchema(z.object({
  object: z.number(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(() => {
  currentStep.value++
})
</script>

<template>
  <div class="wizard relative bg-muted py-10 min-[1400px]:after:rounded-2xl">
    <form @submit="onSubmit">
      <div v-if="currentStep === 1" class="space-y-8">
        <h2>Waarmee heb je schade opgelopen?</h2>
        <FormField v-slot="{ componentField }" type="radio" name="object">
          <FormItem class="space-y-3">
            <FormControl>
              <RadioGroup
                  class="flex flex-col space-y-1"
                  v-bind="componentField"
              >
                <FormItem v-for="object in objects" class="flex items-center space-y-0 gap-x-3">
                  <FormControl>
                    <RadioGroupItem :value="object.id" />
                  </FormControl>
                  <FormLabel class="font-normal">
                    {{ object.object_name}}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
      </div>
      <div v-else-if="currentStep === 2" class="space-y-8">
        <h2>Wanneer en waar heeft het incident plaats gevonden?</h2>
      </div>
      <div class="flex gap-3 mt-8">
        <Button v-if="currentStep > 1" @click="currentStep--" type="button" variant="outline" size="icon-lg" class="shrink-0" aria-label="Vorige stap">
          <ArrowLeft class="size-5"/>
        </Button>
        <Button type="submit" size="lg" class="w-full">
          {{ currentStep === 1 ? 'Doorgaan met schade melden' : 'Volgende stap' }}
          <ArrowRight class="size-5"/>
        </Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wizard::after {
  content: '';
  width: calc(100% + 4rem);
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: hsl(var(--muted));
  z-index: -10;
}
</style>
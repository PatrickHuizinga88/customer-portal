<script setup lang="ts">
import {File, AlertTriangle, Pencil, Gem, Plus} from "lucide-vue-next";

const props = defineProps<{
  object: {
    object_name: string
    object_details: string
  }
  insurance: {
    id: number
    name: string
    status: 'active' | 'in_progress' | 'ended'
    premium: number
    coverage: string
    is_claimable: boolean
    is_editable: boolean
    policy_id: number
    potential?: 'jewelry'
  }
}>()

const statusClasses = computed(() => {
  switch (props.insurance.status) {
    case 'active':
      return 'bg-success/10 text-success border-success'
    case 'in_progress':
      return 'bg-yellow-500'
    case 'ended':
      return 'bg-red-500'
  }
})
</script>

<template>
  <div class="bg-background border rounded-2xl space-y-4 p-5 sm:p-6">
    <div class="flex items-center">
      <h3 class="h4 truncate">{{ insurance.name }}</h3>
      <div :class="['h-5 flex items-center text-xs font-medium border rounded px-2 ml-2 shrink-0', statusClasses]">
        {{ capitalize(insurance.status) }}
      </div>
    </div>
    <div class="space-y-2">
      <div class="flex justify-between items-center gap-x-6 bg-muted rounded px-3 py-1">
        {{ $t('insurances.monthly_premium') }}
        <span class="font-medium text-right">{{ formattedPrice(insurance.premium) }}</span>
      </div>
      <div class="flex justify-between items-center gap-x-6 bg-muted rounded px-3 py-1">
        {{ $t('insurances.coverage') }}
        <span class="font-medium text-right">{{ insurance.coverage }}</span>
      </div>
    </div>
    <div class="space-y-2">
      <Sheet>
        <SheetTrigger as-child>
          <Button v-if="insurance.policy_id" class="w-full">
            <File class="size-5"/>
            {{ $t('insurances.view_policy') }}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" class="rounded-t-2xl">
          <SheetHeader class="text-left pr-10 mb-6">
            <SheetTitle>{{ $t('insurances.policy_overview') }}</SheetTitle>
          </SheetHeader>
          <div class="max-w-[1280px]">
            <div class="grid grid-cols-2 gap-x-3">
              <div class="flex flex-col bg-muted rounded-xl px-4 py-5 space-y-1">
                <span class="text-sm text-primary font-medium">Model</span>
                <span class="h4">{{ object.object_name }}</span>
              </div>
              <div class="flex flex-col bg-muted rounded-xl px-4 py-5 space-y-1">
                <span class="text-sm text-primary font-medium">Kenteken</span>
                <span class="h4">{{ object.object_details }}</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Button v-if="insurance.is_claimable" variant="outline" class="w-full">
        <AlertTriangle class="size-5"/>
        {{ $t('claims.report_a_claim') }}
      </Button>
      <Button v-if="insurance.is_editable" variant="outline" class="w-full">
        <Pencil class="size-5"/>
        {{ $t('insurances.edit_coverage') }}
      </Button>
    </div>
  </div>

  <div v-if="insurance.potential && insurance.potential === 'jewelry'"
       class="bg-primary/10 border border-primary rounded-2xl p-5 sm:p-6">
    <div class="flex mb-4">
      <Gem class="size-8 text-primary shrink-0 mr-3"/>
      <p class="text-lg font-medium">
        Heeft u veel sieraden? Overweeg een aanvullende dekking.
      </p>
    </div>
    <Button size="sm" class="w-full">
      <Plus class="size-5"/>
      Aanvullende dekking aanvragen
    </Button>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {File, AlertTriangle, Pencil, Gem, Plus} from "lucide-vue-next";

const props = defineProps<{
  object: {
    object_name: string
    object_details: string
  }
  insurance: {
    guid: number
    name: string
    status: 'Lopend' | 'Verwerking' | 'Afgelopen'
    premium: number
    coverage: string
    is_claimable: boolean
    is_editable: boolean
    reference?: number
    potential?: 'jewelry'
  }
}>()

const statusClasses = computed(() => {
  switch (props.insurance.status) {
    case 'Lopend':
      return 'bg-success/10 text-success border-success'
    case 'Verwerking':
      return 'bg-yellow-500'
    case 'Afgelopen':
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
          <Button class="w-full" :disabled="!insurance.reference">
            <File class="size-5"/>
            {{ $t('insurances.view_policy') }}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" class="flex flex-col gap-0 rounded-t-2xl lg:inset-x-[15%] xl:inset-x-1/4 p-0 max-h-[calc(100svh-3rem)]">
          <SheetHeader class="sticky text-left p-5 sm:p-6">
            <SheetTitle>{{ $t('insurances.policy_overview') }}</SheetTitle>
          </SheetHeader>
          <div class="flex-1 overflow-y-auto">
            <div class="p-5 sm:p-6 pt-0 pb-10 space-y-8">
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
              <div class="space-y-4">
                <h3 class="h4">Algemene informatie</h3>
                <dl>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Dekking</dt>
                    <dd class="font-medium text-right">{{ insurance.coverage }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Kenteken</dt>
                    <dd class="font-medium text-right">{{ object.object_details }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Premie</dt>
                    <dd class="font-medium text-right">{{ formattedPrice(insurance.premium) }} per maand</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Status</dt>
                    <dd class="font-medium text-right">{{ capitalize(insurance.status) }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Looptijd</dt>
                    <dd class="font-medium text-right">01-01-2024 t/m 31-12-25</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Polisnummer</dt>
                    <dd class="font-medium text-right">{{ insurance.reference }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>Contactpersoon</dt>
                    <dd class="font-medium text-right">John Doe</dd>
                  </div>
                </dl>
              </div>
              <div class="space-y-4">
                <h3 class="h4">Dekking en voorwaarden</h3>
                <div class="w-full h-16 rounded bg-muted"></div>
                <Button variant="outline" class="w-full mt-4">
                  <Pencil class="size-5"/>
                  {{ $t('insurances.edit_coverage') }}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Button variant="outline" class="w-full" as-child>
        <NuxtLink to="/report-claim">
          <AlertTriangle class="size-5"/>
          {{ $t('claims.report_a_claim') }}
        </NuxtLink>
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
        Heb je veel sieraden? Overweeg een aanvullende dekking.
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
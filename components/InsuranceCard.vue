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
    coverages: {
      guid: string
      product: string
    }
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

const transformedCoverage = (product: string) => {
  switch (product) {
    case 'Allrisk':
      return 'Allrisk'
    case 'WA+':
      return 'WA+'
    case 'WA Wettelijke Aansprakelijkheid':
      return 'WA'
  }
}
</script>

<template>
  <Card class="space-y-4">
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
        <span class="font-medium text-right">{{ transformedCoverage(insurance.coverages[0].product) }}</span>
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
        <SheetContent side="bottom"
                      class="flex flex-col gap-0 rounded-t-2xl lg:inset-x-[15%] xl:inset-x-1/4 p-0 max-h-[calc(100svh-3rem)]">
          <SheetHeader class="sticky text-left p-5 sm:p-6">
            <SheetTitle>{{ $t('insurances.insurance_details.policy_details') }}</SheetTitle>
          </SheetHeader>
          <div class="flex-1 overflow-y-auto">
            <div class="p-5 sm:p-6 pt-0 pb-10 space-y-8">
              <div class="grid grid-cols-2 gap-x-3">
                <div class="flex flex-col bg-muted rounded-xl px-4 py-5 space-y-1">
                  <span class="text-sm text-primary font-medium">{{ $t('insurances.insurance_details.vehicle') }}</span>
                  <span class="h4">{{ object.object_name }}</span>
                </div>
                <div class="flex flex-col bg-muted rounded-xl px-4 py-5 space-y-1">
                  <span class="text-sm text-primary font-medium">{{ $t('insurances.insurance_details.licence_plate') }}</span>
                  <span class="h4">{{ object.object_details }}</span>
                </div>
              </div>
              <div class="space-y-4">
                <h3 class="h4">{{ $t('insurances.insurance_details.general_information') }}</h3>
                <dl>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>{{ $t('insurances.coverage') }}</dt>
                    <dd class="font-medium text-right">{{ insurance.coverages[0].product }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>{{ $t('insurances.insurance_details.premium') }}</dt>
                    <dd class="font-medium text-right">{{ formattedPrice(insurance.premium) }} {{ $t('insurances.insurance_details.per_month') }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>{{ $t('insurances.insurance_details.status') }}</dt>
                    <dd class="font-medium text-right">{{ capitalize(insurance.status) }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>{{ $t('insurances.insurance_details.term') }}</dt>
                    <dd class="font-medium text-right">01-01-2024 t/m 31-12-25</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>{{ $t('insurances.insurance_details.policy_id') }}</dt>
                    <dd class="font-medium text-right">{{ insurance.reference }}</dd>
                  </div>
                  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
                    <dt>{{ $t('insurances.insurance_details.contact_person') }}</dt>
                    <dd class="font-medium text-right">John Doe</dd>
                  </div>
                </dl>
              </div>
              <div class="space-y-4">
                <h3 class="h4">{{ $t('insurances.insurance_details.coverages_and_policies') }}</h3>
                <div class="w-full h-16 rounded bg-muted"></div>
                <Button variant="outline" class="w-full mt-4">
                  <Pencil/>
                  {{ $t('insurances.insurance_details.edit_coverage') }}
                </Button>
              </div>
              <div class="space-y-4">
                <h3 class="h4">{{ $t('insurances.insurance_details.documents') }}</h3>
                <ul class="space-y-3">
                  <li>
                    <div class="w-full h-12 rounded bg-muted"></div>
                  </li>
                  <li>
                    <div class="w-full h-12 rounded bg-muted"></div>
                  </li>
                </ul>
              </div>
              <div class="space-y-4">
                <h3 class="h4">{{ $t('insurances.insurance_details.claims') }}</h3>
                <ul class="space-y-3">
                  <li>
                    <div class="w-full h-12 rounded bg-muted"></div>
                  </li>
                  <li>
                    <div class="w-full h-12 rounded bg-muted"></div>
                  </li>
                </ul>
                <Button variant="outline" class="w-full mt-4" as-child>
                  <NuxtLinkLocale to="report-claim">
                    <AlertTriangle/>
                    {{ $t('claims.report_a_claim') }}
                  </NuxtLinkLocale>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Button variant="outline" class="w-full" as-child>
        <NuxtLinkLocale to="report-claim">
          <AlertTriangle class="size-5"/>
          {{ $t('claims.report_a_claim') }}
        </NuxtLinkLocale>
      </Button>
      <Button v-if="insurance.is_editable" variant="outline" class="w-full">
        <Pencil class="size-5"/>
        {{ $t('insurances.edit_coverage') }}
      </Button>
    </div>
  </Card>

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
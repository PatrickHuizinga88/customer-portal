<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {CarFront, Building} from "lucide-vue-next";
import {Separator} from "~/components/ui/separator";
import InsuranceCard from "~/components/InsuranceCard.vue";

const insurances = [
  {
    id: 1,
    name: 'Autoverzekering',
    status: 'actief',
    premium: 78.87,
    coverage: 'Allrisk',
    is_claimable: true,
    is_editable: false,
    policy_id: 123
  },
  {
    id: 1,
    name: 'Autoverzekering',
    status: 'actief',
    premium: 65.12,
    coverage: 'WA+',
    is_claimable: true,
    is_editable: false,
    policy_id: 124
  },
  {
    id: 1,
    name: 'Autoverzekering',
    status: 'actief',
    premium: 68.23,
    coverage: 'Allrisk',
    is_claimable: true,
    is_editable: false,
    policy_id: 125
  },
]

const fallbackObjects = [
  {
    id: 1,
    type: 'car',
    object_name: 'Tesla Model Y',
    object_details: 'BC-123-D',
    insurances: [
      {
        id: 1,
        name: 'Autoverzekering',
        status: 'actief',
        premium: 87.23,
        coverage: 'Allrisk',
        is_claimable: true,
        is_editable: false,
        policy_id: 123
      }
    ]
  },
  {
    id: 2,
    type: 'business_premises',
    object_name: 'Bedrijfspand',
    object_details: 'Josink Hofweg 9A, 7545 PP Enschede',
    insurances: [
      {
        id: 2,
        name: 'Opstalverzekering',
        status: 'actief',
        premium: 40.00,
        coverage: 'Herstel van woningschade',
        is_claimable: true,
        is_editable: false,
      },
      {
        id: 3,
        name: 'Inboedelverzekering',
        status: 'actief',
        premium: 25.34,
        coverage: 'Schade aan inboedel',
        is_claimable: true,
        is_editable: false,
        potential: 'jewelry'
      },
      {
        id: 4,
        name: 'Aansprakelijkheidsverz.',
        status: 'actief',
        premium: 7.50,
        coverage: 'Schade aan derden',
        is_claimable: false,
        is_editable: true,
      }
    ]
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
</script>

<template>
  <Page :title="$t('insurances.header.title')" :description="$t('insurances.header.description')">
    <div class="flex flex-col gap-y-8">
      <div v-if="objects.length && status !== 'pending'" v-for="(object, index) in objects" class="space-y-4">
        <div class="flex items-center">
          <div class="p-2 bg-primary/10 text-primary rounded-lg mr-3">
            <component v-if="object.type" :is="objectIcon(object.type)" class="size-10"/>
          </div>
          <div>
            <h2 class="h4">{{ object.object_name }}</h2>
            <div class="text-sm text-muted-foreground">{{ object.object_details }}</div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
          <InsuranceCard v-for="insurance in object.insurances" :object="{object_name: object.object_name, object_details: object.object_details}"
                         :insurance="insurance"/>
        </div>
        <Separator v-if="index !== objects.length - 1" class="w-full !mt-8"/>
      </div>
      <div v-else-if="status === 'pending'" class="space-y-4">
        <div class="flex items-center">
          <Skeleton class="mr-3 size-14"/>
          <Skeleton class="h-8 w-64"/>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton class="h-64"/>
          <Skeleton class="h-64"/>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped>

</style>
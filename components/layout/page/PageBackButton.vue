<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

defineProps<{
  to?: string
  label: string
}>()
</script>

<template>
<Button variant="ghost" size="sm" asChild>
  <NuxtLink :to="to ?? $router.back()">
    <ArrowLeft class="size-4 -ml-1" />
    {{ label }}
  </NuxtLink>
</Button>
</template>
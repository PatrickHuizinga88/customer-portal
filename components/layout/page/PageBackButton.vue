<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

defineProps<{
  to?: string
  label: string
}>()
</script>

<template>
<Button variant="ghost" size="sm" asChild>
  <NuxtLinkLocale :to="to ?? $router.back()">
    <ArrowLeft class="size-4 -ml-1" />
    {{ label }}
  </NuxtLinkLocale>
</Button>
</template>
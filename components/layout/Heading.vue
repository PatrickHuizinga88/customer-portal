<script setup lang="ts">
defineProps<{
  pageTitle: string
  pageDescription?: string
}>()
</script>

<template>
  <header class="pb-8 lg:pb-10">
    <h1 v-if="pageTitle" class="h2">{{ pageTitle }}</h1>
    <p v-if="pageDescription" class="sm:text-lg text-muted-foreground">{{ pageDescription }}</p>
  </header>
</template>
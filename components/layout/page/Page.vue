<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  description?: string
}>()
</script>

<template>
  <LayoutHeading :pageTitle="title" :pageSubtitle="subtitle" :pageDescription="description"/>
  <main>
    <slot/>
  </main>
</template>
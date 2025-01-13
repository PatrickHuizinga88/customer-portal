<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <LayoutHeader :pageTitle="title" :pageSubtitle="subtitle"/>
  <main>
    <slot/>
  </main>
</template>
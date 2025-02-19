<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <div>
    <dt class="text-sm leading-none font-medium">{{ label }}</dt>
    <dd class="py-2">{{ value }}</dd>
  </div>
</template>

<style scoped>

</style>
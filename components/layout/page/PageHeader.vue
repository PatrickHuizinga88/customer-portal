<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex justify-between items-center gap-4 mb-6', props.class)">
    <slot/>
  </div>
</template>
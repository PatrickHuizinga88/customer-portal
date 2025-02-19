<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('overflow-hidden border border-border rounded-2xl bg-card px-4 sm:px-6 py-5', props.class)">
    <slot/>
  </div>
</template>
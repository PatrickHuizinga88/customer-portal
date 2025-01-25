<script setup lang="ts">
import {BotIcon} from "lucide-vue-next";
import {marked} from "marked";

const props = defineProps<{
  message: {
    role: string
    content: string
  },
  isLoading: boolean,
}>()

const compiledMarkdown = computed(() => {
  return marked(props.message.content)
})
</script>

<template>
  <div v-if="message.role === 'user'" class="flex justify-end ml-12">
    <div class="max-w-2xl border border-border rounded-lg text-sm leading-relaxed px-4 py-2">
      {{ message.content }}
    </div>
    <Avatar class="shrink-0 ml-2">
      <AvatarFallback>PH</AvatarFallback>
    </Avatar>
  </div>
  <div v-if="message.role === 'assistant'" class="flex justify-start mr-12">
    <div class="flex justify-center items-center shrink-0 bg-muted rounded-full overflow-hidden h-10 w-10 mr-2">
      <img src="../assets/images/support.webp" alt="Support" class="h-full w-full object-fit"/>
    </div>
    <div class="max-w-2xl bg-muted border border-border rounded-lg text-sm leading-relaxed px-4 py-2" v-html="compiledMarkdown"></div>
  </div>
  <div v-else-if="!message.role && isLoading" class="flex justify-start mr-12">
    <div class="flex justify-center items-center shrink-0 bg-muted rounded-full overflow-hidden h-10 w-10 mr-2">
      <img src="../assets/images/support.webp" alt="Support" class="h-full w-full object-fit"/>
    </div>
    <div class="max-w-2xl w-full h-10 bg-muted rounded-lg animate-pulse"></div>
  </div>
</template>

<style scoped>

</style>
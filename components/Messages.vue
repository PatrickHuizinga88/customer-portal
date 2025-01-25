<script setup lang="ts">
import {useScroll} from '@vueuse/core'
import {BotIcon, ArrowDown} from "lucide-vue-next";

const props = defineProps<{
  messages: {
    role: string
    content: string
  }[]
}>()

const bottomDiv = ref<HTMLDivElement | null>(null)
const scrollableDiv = ref<HTMLElement | null>(null)
const scrollingToTop = ref(false)

const {directions} = useScroll(scrollableDiv)
const {top: toTop } = toRefs(directions)

const scrollToBottom = () => {
  scrollingToTop.value = false
  bottomDiv.value?.scrollIntoView({behavior: 'smooth', block: 'end'})
}

watch(() => props.messages, () => {
  if (scrollingToTop.value) return

  bottomDiv.value?.scrollIntoView({behavior: 'instant', block: 'end'})
})

watch(() => toTop.value, () => {
  scrollingToTop.value = true
})
</script>

<template>
  <div class="relative flex-1 overflow-hidden h-full]">
    <div class="h-full overflow-y-auto" ref="scrollableDiv">
      <div class="w-full sm:max-w-4xl mx-auto h-full pt-6">
        <div v-if="messages.length" class="h-full flex flex-col justify-end gap-y-6">
          <Message v-for="message in messages" :message="message"/>
          <div ref="bottomDiv"></div>
        </div>
      </div>
    </div>
    <button v-if="scrollingToTop" @click="scrollToBottom" class="absolute bottom-2 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-background border shadow-md hover:bg-muted duration-150">
      <ArrowDown class="size-5"/>
    </button>
  </div>
</template>

<style scoped>

</style>
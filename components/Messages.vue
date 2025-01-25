<script setup lang="ts">
import {useScroll} from '@vueuse/core'
import {BotIcon, ArrowDown} from "lucide-vue-next";

const props = defineProps<{
  messages: {
    role: string
    content: string
  }[]
  isLoading: boolean
}>()

const bottomDiv = ref<HTMLDivElement | null>(null)
const scrollableDiv = ref<HTMLElement | null>(null)
const scrollingToTop = ref(false)

// const {directions} = useScroll(scrollableDiv)
// const {top: toTop} = toRefs(directions)

const scrollToBottom = () => {
  scrollingToTop.value = false
  bottomDiv.value?.scrollIntoView({behavior: 'smooth', block: 'end'})
}

watch(() => [props.messages, props.isLoading], () => {
  if (scrollingToTop.value) return

  bottomDiv.value?.scrollIntoView({behavior: 'instant', block: 'end'})
}, {
  deep: true
})

// watch(() => toTop.value, () => {
//   scrollingToTop.value = true
// })
</script>

<template>
  <div class="relative flex-1 overflow-hidden h-full">
    <div class="h-full overflow-y-auto px-4" ref="scrollableDiv">
      <div class="w-full sm:max-w-4xl mx-auto h-full pt-6">
        <div v-if="messages.length" class="min-h-full flex flex-col justify-end gap-y-6">
          <transition-group
            enter-active-class="duration-100"
            enter-from-class="opacity-0 -translate-y-0.5"
            enter-to-class="opacity-1 translate-none">
            <Message v-for="(message, index) in messages" :message="message" :isLoading="isLoading" :key="index"/>
          </transition-group>
          <div ref="bottomDiv"></div>
        </div>
        <div v-else class="h-full flex flex-col justify-center items-center text-center">
          <div class="size-16 rounded-full overflow-hidden mb-4">
            <img src="../assets/images/support.webp" alt="Support"/>
          </div>
          <h1 class="text-2xl font-bold mb-3">
            Ik ben jouw schade assistent
          </h1>
          <p class="text-muted-foreground max-w-sm">
            Vervelend dat je schade hebt opgelopen. Vertel wat er is gebeurd, dan help ik je graag verder.
          </p>
        </div>
      </div>
    </div>
    <button v-if="scrollingToTop" @click="scrollToBottom"
            class="absolute bottom-2 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-background border shadow-md hover:bg-muted duration-150">
      <ArrowDown class="size-5"/>
    </button>
  </div>
</template>

<style scoped>

</style>
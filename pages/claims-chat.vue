<script setup lang="ts">
import {useChat} from '@ai-sdk/vue';
import { Send,Loader2 } from "lucide-vue-next";

definePageMeta({
  layout: 'chat'
})

const loading = ref(false)
const finished = ref(false)

const {messages, input, isLoading, handleSubmit} = useChat({
  onFinish: async () => {
    if (messages.value[messages.value.length - 1].content.includes('Bedankt voor de informatie!')) {
      finished.value = true
      await completeClaim()
    }
  }
})

const completeClaim = async () => {
  await $fetch('/api/complete-claim', {
    method: 'POST',
    body: {
      messages
    }
  })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <Messages :messages="messages" :isLoading="isLoading"/>
    <div class="w-full flex justify-center py-6 border-t z-10 px-4">
      <div class="w-full sm:max-w-4xl">
        <form v-if="!finished" @submit="handleSubmit">
          <div class="flex gap-x-2">
            <Textarea
              v-model="input"
              placeholder="Typ hier je bericht..."
              class="text-base"
              rows="3"
              @keydown.enter.prevent="handleSubmit"
            />
            <Button type="submit" size="icon" :disabled="loading" class="shrink-0">
              <Send v-if="!loading" class="h-4 w-4"/>
              <Loader2 v-else class="animate-spin h-4 w-4"/>
            </Button>
          </div>
        </form>
        <template v-else>
          <p class="text-center text-sm text-muted-foreground">Je schade melding is opgeslagen. Je kunt deze pagina verlaten.</p>
          <Button @click="completeClaim" class="w-full mt-4" as-child>
            <NuxtLink to="/">
              Naar homepagina
            </NuxtLink>
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
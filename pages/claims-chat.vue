<script setup lang="ts">
import {useChat} from '@ai-sdk/vue';
import { Send,Loader2 } from "lucide-vue-next";

definePageMeta({
  layout: 'chat'
})

const {messages, input, handleSubmit} = useChat()

const completeClaim = async () => {
  const response = await $fetch('/api/complete-claim', {
    method: 'POST',
    body: {
      messages
    }
  })
  console.log(response)
}

const loading = ref(false)
</script>

<template>
  <div class="h-full flex flex-col">
    <Messages :messages="messages"/>

    <div class="w-full flex justify-center py-6 border-t z-10">
      <div class="w-full sm:max-w-4xl">
        <form @submit="handleSubmit">
          <div class="flex gap-x-3">
            <Textarea
              v-model="input"
              placeholder="Omschrijf wat er is gebeurd"
              class="text-base"
            />
            <Button type="submit" size="icon" :disabled="loading" class="shrink-0">
              <Send v-if="!loading" class="h-4 w-4"/>
              <Loader2 v-else class="animate-spin h-4 w-4"/>
            </Button>
          </div>
        </form>
        <Button @click="completeClaim" class="w-full mt-4">
          Claim indienen
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
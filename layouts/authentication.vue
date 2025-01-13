<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";

const notificationStore = useNotificationStore()
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
    <slot/>
  </div>

  <NotificationList :notifications="notificationStore.notifications" />

</template>

<style>

</style>
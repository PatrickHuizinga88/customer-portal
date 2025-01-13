<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import { useNotificationStore } from "~/stores/notificationStore";

const notificationStore = useNotificationStore()
</script>

<template>

  <NuxtLoadingIndicator :color="`hsl(var(--primary))`" />

  <LayoutSidebar ref="sidebar" />

  <div class="lg:pl-64 overflow-x-hidden">
    <div class="container">
      <div class="pb-6">
        <slot />
      </div>
    </div>
  </div>

  <NotificationList :notifications="notificationStore.notifications" />

</template>
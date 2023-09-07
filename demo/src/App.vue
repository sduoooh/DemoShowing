<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Helper from './components/Helper.vue'

const router = useRouter()
</script>

<template>
  <Helper v-if="router.currentRoute.value.name !== 'list'" :window="window"></Helper>
  <div style="min-height: 100vh;display: flex;flex-direction: column;">
    <RouterView></RouterView>
  </div>
</template>

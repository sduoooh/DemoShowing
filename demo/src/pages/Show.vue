<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <iframe style="width: 100vw;min-height: 100vh;" :src="`../../demo_list/${router.currentRoute.value.params.demoName}/dist/index.html`">
    </iframe>
</template>

<style scoped>
</style>
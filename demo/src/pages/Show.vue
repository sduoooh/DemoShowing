<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <iframe style="width: 99vw;min-height: 99vh;" :src="`../../demo_list/${router.currentRoute.value.params.demoName}/dist/index.html`">
    </iframe>
</template>

<style scoped>
</style>
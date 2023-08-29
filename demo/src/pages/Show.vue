<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <iframe :src="`/demo_list/${router.currentRoute.value.params.demoName}/index.html`">
    </iframe>
</template>

<style scoped>
</style>
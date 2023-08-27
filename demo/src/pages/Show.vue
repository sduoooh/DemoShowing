<script setup>
import { useRouter } from 'vue-router'

import axios from 'axios'

const router = useRouter()
</script>

<template>
    <iframe :src="`/pubilc/demo_list/${router.currentRoute.value.params.demoName}/index.html`">
    </iframe>
</template>

<style scoped>
</style>
<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { isHelperDaggable } from '../share/data'
const demo = ref(null)
const router = useRouter()


watchEffect(()=>{
    if(isHelperDaggable.value){
        demo.value?.classList.add('helperDaggable')
    }else{
        demo.value?.classList.remove('helperDaggable')
    }
})

</script>

<template>
    <iframe style="width: 99vw;min-height: 99vh;" :src="`/demo_list/${router.currentRoute.value.params.demoName}/dist/index.html`" ref="demo">
    </iframe>
</template>

<style scoped>
.helperDaggable {
    pointer-events: none;
}
</style>
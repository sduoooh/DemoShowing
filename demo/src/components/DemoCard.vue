<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useDateFormat, onClickOutside } from "@vueuse/core"

const target = ref(null)
const mainCard = ref(null)
const router = useRouter()

const props = defineProps({
    name: {
        type: String,
    },
    information: {
        type: String,
    },
    lastedUpdate: {
        type: String,
    },
    url : {
        type: String,
    }
})

onClickOutside(target, (event) => mainCard.value.className = 'start')

const skip = ()=> {
    window.open(props.url)

}
const date = useDateFormat(props.lastedUpdate, '最后更新于 YYYY-MM-DD')
</script>

<template>
    <div style="display: flex;flex-direction: row;margin-bottom: 5rem;" ref="target">
        <div style="transition: 1.5s;display: flex;flex-direction: row;position: relative;flex: auto;max-height:40vh;border: 2px solid rgb(242,242,242);border-radius: 0.5rem;"  class="start" @click="mainCard.className = mainCard.className === 'start' ? 'temp' : 'start'"
                ref="mainCard">
            <div
                style="display: flex;flex-direction: column;">
                <div style="margin: 3rem 5rem;width: calc(35vw);display: flex;flex-direction: column;">
                    <div style="display: flex;flex-direction: row;margin-bottom: 3rem;">
                        <div style="flex:auto">
                            <span style="font-size: 2rem;font-weight: 900;">{{ props.name }}</span>
                        </div>
                        <div style="display: flex;flex-direction: column;justify-content: center;">
                            <div style="font-size: 0.8rem;font-weight: 500;color: rgb(125,125,125);">{{ date }}</div>
                        </div>
                    </div>
                    <div style="font-size: 1.1rem;font-weight: 500;word-wrap: break-word;margin-bottom: 1rem;">
                        {{ props.information }}
                    </div>
                </div>
            </div>
            <div style="width: 10rem;background-color: rgb(6, 117, 65);"></div>
        </div>
        <div
            style="width: 10rem;position: relative;border: 2px solid rgb(242,242,242);border-left-width: 0;border-radius: 0.5rem;right: 5rem;display: flex;flex-direction: row;justify-content: center;z-index: -1;">
            <div style="display: flex;flex-direction: column;justify-content: center;">
                <div style="display: flex;flex-direction: column;">
                    <div class="button" @click="skip"><span style="line-height: 2.5rem;margin: 0.25rem 0.25rem ;">{{ "查看源码" }}</span>
                    </div>
                    <div class="button" @click="router.push(`/demo/${props.name}`)"><span style="line-height: 2.5rem;margin: 0.25rem 0.25rem;">{{ "试试样例" }}</span></div>
                </div>  
            </div>
        </div>
    </div>
</template>

<style scoped>
.start {
    left: 5rem;
}

.temp {
    left: -5rem;

}

.button {
    border: 1px solid rgb(67, 17, 17);
    border-radius: 0.25rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
}</style>
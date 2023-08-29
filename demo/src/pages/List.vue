<script setup>
import { ref } from 'vue'
import axios from 'axios'

import DemoCard from '../components/DemoCard.vue'

const input = ref('')

const cardList = ref([])
axios.get(
    '/demo_list/demoList.json'
).then((i)=>{
    cardList.value = i.data
})

const finderContainer = ref(null)
const isTransition = ref(false)
const isTemp = ref(false)
const page = ref(null)
const cards = ref(null)
const check = ref(null)
const finder = ref(null)
const findMode = ref(false)

const change = () => {
    if (isTransition.value) return
    isTransition.value = true
    if (!findMode.value) {
        finderContainer.value.className = 'endStatusA'
        finder.value.className = 'endStatusB'
        setTimeout(
            () => {
                check.value.className = 'endStatusC'
            }, 950
        )
        setTimeout(
            () => {
                findMode.value = true
                isTransition.value = false
            }, 1700
        )
    }else {
        finderContainer.value.className = isTemp.value ? 'endStatusA' : 'tempStatusA'
        setTimeout(
            () => {
                isTemp.value = !isTemp.value
                isTransition.value = false
            }, 1700
        )
    }
}

const checkWheel = (event) => {
    const distance = document.body.getBoundingClientRect().top
    !distance ? (findMode.value ? (isTemp.value ? (event.deltaY < 0 ? change()  : 1 ) : (event.deltaY > 0 && cardList.value.length ? change() : 1 ) ) : ( event.deltaY > 0 ? change() : 1 )) : 1
}

const enter = () => {
    !findMode.value ? (() => { change() ; setTimeout(change, 1750) })() : (()=>{if(!isTemp.value) {change()}})()
}

const inputEvent = () => {
    if (finder.value.innerHTML.length >= 18) {
        finder.value.innerHTML = input.value
        initArr()
        return
    }
    input.value = finder.value.innerHTML
    if (input.value.length >= 5) {
        enter()
    }
}

const initArr = () => {
    document.execCommand("selectAll", false, null)
    document.getSelection().collapseToEnd()
}
</script>

<template>
    <div ref="page" style="flex: auto;display: flex;flex-direction: column;overflow-x: hidden;" @wheel="checkWheel">
        <div class="startStatusA" style="display: flex;flex-direction: column;justify-content: center;transition: 1.5s;"
            ref="finderContainer">
            <div style="display: flex;flex-direction: row;justify-content: center;">
                <div style="display: flex;flex-direction: row;">
                    <div ref="finder" class="startStatusB"
                        style="position: relative;
                        transition: 1.5s;border: 0.15rem solid rgb(56, 107, 28);background-color: white;vertical-align: middle;" contenteditable="true"
                        @keydown.enter.prevent="enter" @keyup="inputEvent" @keydown="inputEvent">
                    </div>
                    <div ref="check"
                        style="height: 5rem;width: 5rem;border-radius: 100%;transition: 1.5s;position: relative;background-color:aquamarine;"
                        class="startStatusC"></div>
                </div>
            </div>
        </div>
        <div style="flex: auto;display: flex;flex-direction: row;justify-content: center;margin-top: 20vh;" v-if="findMode" ref="cards">
            <div style="display: flex;flex-direction: column;">
            <DemoCard v-for="i in cardList" :name="i.name" :information="i.information" :lasted-update="i.lastedUpdate" :url="i.url" />
            </div>
        </div>
    </div>
</template> 

<style scoped>
.startStatusA {
    flex: auto;
}

.endStatusA {
    height: 25vh;
    margin-top: 0;
}


.tempStatusA {
    height: 25vh;
    margin-top: -25vh;
}


.startStatusB {
    width: 65vw;
    height: 8rem;
    right: 0;
    border-radius: 8rem;
    font-size: 4rem;
    text-indent: 3rem;
    line-height: 7rem;
}

.endStatusB {
    right: 1.2rem;
    width: 50vw;
    height: 5rem;
    border-radius: 5rem;
    font-size: 2.5rem;
    text-indent: 1.88rem;
    line-height: 4.38rem;
}

.startStatusC {
    left: 50vw;
}

.endStatusC {
    left: 1.2rem;
}
</style>
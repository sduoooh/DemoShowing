<script setup>
import { ref } from 'vue'
import { useDraggable, useMouseInElement, useWindowSize } from '@vueuse/core'

const help = ref(null)
const helperClassName = ref('overview')
const LAST = ref([0,0])
const { width, height } = useWindowSize()
const { x, y, style } = useDraggable(help, {
  initialValue: { x: 10, y: 10 },
  preventDefault: true,
  onStart: () => {
    if (helperClassName.value !== 'overview') return false
  },
  onMove: (position) => {
    if ((position.x <= 10 || position.x >= width.value - 64)){
        x.value = position.x <= 10 ? 10 : width.value - 64
    }
    if(position.y <= 10 || position.y >= height.value - 64){
        y.value = position.y <= 10 ? 10 : height.value - 64
    }
  },

})
const { elementX, elementY } = useMouseInElement(help)

const changeStatus = (isOpen) => {
    isOpen ? LAST.value = [elementX.value, elementY.value] : 1
    isOpen ? [x.value, y.value] = [LAST.value[0] + x.value, LAST.value[1] + y.value] : [x.value, y.value] = [x.value - LAST.value[0],  y.value - LAST.value[1]]
    helperClassName.value = ['overview', 'main'][isOpen]
}
</script>

<template>
    <div ref="help" style="position: fixed;caret-color: transparent;" @contextmenu.prevent @click.right="changeStatus(1)" :class="helperClassName" :style="style">
        <img v-if="helperClassName === 'overview'" src="/logo.png" style="width: 4rem;"/>
        <div v-else style="display: flex;flex-direction: column;">
            <div class="rowCenter border helperUnit">
                <div class="columnMargin">{{ " 返回列表 " }}</div>
            </div>
            <div class="rowCenter border bottomBorder helperUnit">
                <div class="columnMargin" >{{ " 查看源码 " }}</div>
            </div>
            <div class="rowCenter border bottomBorder helperUnit" @click.left.prevent="changeStatus(0)">
                <div class="columnMargin" >{{ " 取"}}<span style="visibility: hidden;">{{ "占位" }}</span>{{ "消 " }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .overview {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: white;
  }

  .main {
    width: auto;
    height: auto;
  }

  .rowCenter {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .border {
    border: 2px solid rgb(195, 195, 195);
  }

  .bottomBorder {
    border-top-width: 0;
  }

  .columnMargin {
    padding: 0.5rem 1rem;
  }

  .helperUnit :active {
    background-color: rgb(242,242,242);
  }
</style>
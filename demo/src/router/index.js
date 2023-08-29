import { computed,ref } from 'vue'
import axios from 'axios'
import { createRouter, createWebHashHistory } from 'vue-router'

const demoList = ref([])
axios.get(
    '/demo_list/demoList.json'
).then((i)=>{
    demoList.value = i.data
})

import List from '../pages/List.vue'
import Show from '../pages/Show.vue'

const routes = [
    {
        path: '/',
        redirect: '/list',
        name : 'list',
    },
    {
        path: '/list',
        component: List,
        name: 'list',
    },
    {
        path: '/demo/:demoName+',
        component: Show,
        name: 'show',
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/list'
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to) => {
    const demoExisted = computed(() => demoList.value.every((i)=>i.name === to.params.demoName[0]) )
    if (to.name === 'show' && !demoExisted.value ) {
        router.push('/list')
    }
})
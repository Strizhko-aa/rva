import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from '@/components/LoginRegister.vue'
import HelloWorld from '@/components/HelloWorld.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/login', component: LoginRegister }
  ]
})

export default router
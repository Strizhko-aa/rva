import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '@/components/Auth/RegisterComponent.vue'
import LoginComponent from '@/components/Auth/LoginComponent.vue'
import CarListVue from '@/components/Car/CarListVue.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CarListVue },
    { path: '/registration', component: RegisterComponent },
    { path: '/login', component: LoginComponent }
  ]
})

export default router
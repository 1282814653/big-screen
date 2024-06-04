import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/web3d',
      name: 'Web3D',
      component: () => import('../views/web-3d/index.vue')
    },
    {
      path: '/big-screen',
      name: 'BigScreen',
      component: () => import('../views/big-screen/index.vue')
    }
  ]
})

export default router

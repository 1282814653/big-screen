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
      path: '/big-screen',
      name: 'BigScreen',
      component: () => import('../views/big-screen/index.vue'),
      meta: {
        name: '大屏',
        icon: ''
      }
    },
    {
      path: '/back-mgt',
      name: 'BackMgt',
      component: () => import('../views/back-mgt/index.vue'),
      meta: {
        name: 'PC后台管理',
        icon: ''
      }
    },
    {
      path: '/small-program',
      name: 'SmallProgram',
      component: () => import('../views/small-program/index.vue'),
      meta: {
        name: 'H5/微信小程序',
        icon: ''
      }
    },

    {
      path: '/web3d',
      name: 'Web3D',
      component: () => import('../views/web-3d/index.vue'),
      meta: {
        name: 'WEB3D',
        icon: ''
      }
    }
  ]
})

export default router

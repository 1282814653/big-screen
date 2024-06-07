import './assets/main.css'
import 'normalize.css/normalize.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import 'virtual:svg-icons-register'

// 1. 引入 element-plus 全部Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import 'echarts'
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'

// thress
import * as three from 'three'

// 1. svg 使用方式四
import { Icon } from '@iconify/vue'

// svg图标注册
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus) // ElementPlus
app.component('v-chart', VChart) // VChart

// 注册所有的 icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('Icon', Icon)

// app.config.globalProperties.globalEcharts = echarts // 在getCurrentInstance()中找 (此方法官方以弃用)
app.provide('globalEcharts', echarts) // 在setup() 使用 inject 中找 (推荐此方法)
app.provide('globalThree', three) // 在setup() 使用 inject 中找 (推荐此方法)

app.mount('#app')

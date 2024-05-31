import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import 'echarts'
import * as echarts from 'echarts'
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus) // ElementPlus
app.component('v-chart', VChart) // VChart

// app.config.globalProperties.globalEcharts = echarts // 在getCurrentInstance()中找 (此方法官方以弃用)
app.provide('globalEcharts', echarts) // 在setup() 使用 inject 中找 (推荐次方法)

app.mount('#app')

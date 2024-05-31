<template>
  <v-chart class="map-chart" id="mapRef" ref="mapRef" authsize></v-chart>
</template>
<script setup>
import axios from 'axios'

import { ref, onMounted, onUpdated, defineExpose, inject, nextTick } from 'vue'
import mapJson from './index2.json'
const globalEcharts = inject('globalEcharts')

const mapRef = ref(null)
const mapOption = ref({}) // 地图配置项
const zoom = ref(2.8) // 缩放比例
const mapType = ref('china') // 地图类型
const roam = ref(false) // 是否可以缩放
const top = ref('40%') // 距离顶部
const right = ref('20%') // 距离底部
const bottom = ref('20%') // 距离底部
const HQ = [118.767413, 32.041544] // 总部坐标
const initMap = ref(null)
const commonConfig = ref({
  // 地图和背景图的公共配置
  map: mapType.value,
  aspectScale: 0.9, // 长宽比
  zoom: zoom.value, // 缩放比例
  roam: roam.value,
  // scaleLimit: {
  //   min: 6,
  //   max: 8
  // },
  layoutCenter: ['50%', '60%'],
  // layoutSize: 150
  top: top.value,
  // right: right.value,
  bottom: bottom.value
})
// 需要动画的城市列表
const provinceList = [
  { value: [87.628579, 43.793301], itemStyle: { color: '#00EEFF' } },
  { value: [104.076452, 30.651696], itemStyle: { color: '#00EEFF' } },
  { value: [103.826777, 36.060634], itemStyle: { color: '#00EEFF' } },
  { value: [102.709372, 25.046432], itemStyle: { color: '#00EEFF' } },
  { value: [108.327537, 22.816659], itemStyle: { color: '#00EEFF' } },
  { value: [112.982951, 28.116007], itemStyle: { color: '#00EEFF' } },
  { value: [117.020725, 36.670201], itemStyle: { color: '#00EEFF' } },
  { value: [113.753094, 34.767052], itemStyle: { color: '#00EEFF' } },
  { value: [112.578781, 37.813948], itemStyle: { color: '#00EEFF' } },
  { value: [119.296194, 26.101082], itemStyle: { color: '#00EEFF' } },
  { value: [120.152575, 30.266619], itemStyle: { color: '#00EEFF' } },
  { value: [118.763563, 32.061377], itemStyle: { color: '#00EEFF' } },
  { value: [116.407387, 39.904179], itemStyle: { color: '#00EEFF' } },
  { value: [108.953939, 34.266611], itemStyle: { color: '#00EEFF' } },
  { value: [113.266887, 23.133306], itemStyle: { color: '#00EEFF' } },
  { value: [118.767413, 32.041544], itemStyle: { color: '#FFFA00' } }
]

onMounted(() => {
  initMapView()
  initMap.value.resize()
})

window.addEventListener('resize', () => {
  if (initMap.value) {
    initMap.value.resize()
  }
})
onUpdated(() => {})

const initMapView = () => {
  globalEcharts.registerMap(mapType.value, { geoJSON: mapJson })
  initMap.value = globalEcharts.init(document.querySelector('#mapRef'))
  initMap.value.setOption(mapOption.value)
  // 初始化地图

  //   axios.get('/map/index2.json').then((res) => {
  //   globalEcharts.registerMap(mapType.value, { geoJSON: res.data })
  //   mapChart.value = globalEcharts.init(document.getElementById('map'))
  //   mapChart.value.setOption(mapOption.value)
  //   })
}

mapOption.value = {
  geo: {
    ...commonConfig.value
  },
  series: [
    {
      type: 'map',
      label: {
        show: true,
        color: '#fff',
        fontSize: 10
      },
      emphasis: {
        label: {
          disabled: false,
          show: false,
          color: '#2aff00',
          fontSize: 12
        }
      },
      itemStyle: {
        borderColor: '#0068FB',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: '#0C3994' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0C3994' // 100% 处的颜色
            }
          ],
          globalCoord: true // 缺省为 false
        }
      },
      emphasis: {
        label: {
          disabled: false,
          areaColor: '#0068FB',
          borderWidth: 0.1
        }
      },
      ...commonConfig.value
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 1,
      rippleEffect: {
        number: 3, // 波纹的数量。
        period: 5, // 动画的周期，秒数。
        scale: 17, // 动画中波纹的最大缩放比例。
        brushType: 'fill' // 波纹的绘制方式，可选 'stroke' 和 'fill'。
      },
      symbolSize: 2,
      data: provinceList
    }, // 地图线的动画效果
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      zlevel: 1,
      rippleEffect: {
        number: 4,
        period: 5,
        scale: 21,
        brushType: 'fill'
      },
      symbolSize: 3,
      data: [provinceList[provinceList.length - 1].value]
    },
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, // 箭头指向速度，值越小速度越快
        trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'pin', // 箭头图标
        symbolSize: 6 // 图标大小
      },
      lineStyle: {
        color: '#1DE9B6',
        width: 1, // 线条宽度
        opacity: 0.1, // 尾迹线条透明度
        curveness: 0.3 // 尾迹线条曲直度
      },
      data: provinceList.map((item) => {
        return {
          coords: [HQ, item.value],
          lineStyle: item.itemStyle
        }
      })
    }
  ]
}
</script>
<style scoped lang="scss">
.map-chart {
  width: 960px;
  height: 650px;
  background: url('../../../assets/images/jt.png');
  background-repeat: repeat-x;
}
</style>

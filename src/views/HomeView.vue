<template>
  <VScaleScreen width="1920" height="1080" ref="scale-screen" fullScreen>
    <div class="zn-content">
      <!-- 上 -->
      <div class="content-header">大数据平台</div>
      <!-- 下 -->
      <div class="content-center">
        <!-- 左 -->
        <div class="center-left">
          <div class="left-top">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TitleNav :title="'部门分布'" />
                <v-chart class="echart-size" ref="chart1" :option="option1" authsize />
              </el-card>
            </ContentBox>
          </div>
          <div class="left-middle">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TitleNav :title="'部门分布'" />
                <v-chart class="echart-size" ref="chart2" :option="option2" authsize />
              </el-card>
            </ContentBox>
          </div>
          <div class="left-bottom">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TitleNav :title="'年度完成情况'" />
                <v-chart class="echart-size" ref="chart3" :option="option3" authsize />
              </el-card>
            </ContentBox>
          </div>
        </div>
        <!-- 中 -->
        <div class="center-center">
          <div class="center-top">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <DPMapView />
              </el-card>
            </ContentBox>
          </div>
          <div class="center-bottom">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TableList />
              </el-card>
            </ContentBox>
          </div>
        </div>
        <!-- 右 -->
        <div class="center-right">
          <div class="right-top">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TitleNav :title="'部门分布'" />
                <v-chart class="echart-size" ref="chart5" :option="option5" authsize />
              </el-card>
            </ContentBox>
          </div>
          <div class="right-middle">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TitleNav :title="'部门分布'" />
                <v-chart class="echart-size" ref="chart6" :option="option6" authsize />
              </el-card>
            </ContentBox>
          </div>
          <div class="right-bottom">
            <ContentBox>
              <el-card :bodyStyle="bodyStyle">
                <TitleNav :title="'半年度完成情况'" />
                <v-chart class="echart-size" ref="chart7" :option="option7" authsize />
              </el-card>
            </ContentBox>
          </div>
        </div>
      </div>
    </div>
  </VScaleScreen>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useWindowSize, useElementBounding } from '@vueuse/core'
import VScaleScreen from 'v-scale-screen'
import TitleNav from '../components/TitleNav/index.vue'
import ContentBox from '../components/ContentBox/index.vue'

import DPMapView from './common/DPMapView/index.vue'
import TableList from './common/TableList/index.vue'
const { width, height } = useWindowSize()

const pageWidth = ref(width.value)
const pageHeight = ref(height.value)
const bodyStyle = ref({
  backgroundColor: '#000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
})
const boxStyle = ref({
  background: 'linear-gradient(to top ,#00257d, #042f55)'
})

const bodyClass = ref('echart-size')

// --------------------------------
const globalEcharts = inject('globalEcharts')

onMounted(() => {
  // initPageEcharts()
})

// --------------------------------
const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)

const chart5 = ref(null)
const chart6 = ref(null)
const chart7 = ref(null)

window.addEventListener('resize', (event) => {
  initPageEcharts()
})

const initPageEcharts = () => {
  chart1.value.resize()
  chart2.value.resize()
  chart3.value.resize()
  chart5.value.resize()
  chart6.value.resize()
  chart7.value.resize()
}

// --------------------------------

// 左边 上
const option1 = ref({
  title: {
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  series: [
    {
      name: '人员占比',
      type: 'pie',
      radius: '85%',
      center: ['50%', '50%'],
      data: [
        { value: 32, name: '男性' },
        { value: 28, name: '女性' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

// 左边 中
let option2Data = [
  { name: '总经办', value: 3 },
  { name: '运营部', value: 25 },
  { name: '营销部', value: 22 },
  { name: '研发部', value: 2 },
  { name: '财务部', value: 4 },
  { name: '人事部', value: 4 }
]

const option2 = {
  color: ['#FF4B01', '#FF7B00', '#FFE823', '#2379FF', '#2379FF', '#2379FF'],
  tooltip: {
    show: true,
    trigger: 'item',
    padding: [10, 5]
  },
  legend: {
    show: false
  },
  grid: {
    left: '-5%',
    right: '2%',
    top: '10%',
    bottom: '-5%',
    containLabel: true
  },
  xAxis: [
    {
      splitLine: {
        show: false
      },
      type: 'value',
      show: false
    }
  ],
  yAxis: [
    {
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      type: 'category',
      axisTick: {
        show: false
      },
      inverse: true,
      data: option2Data.map((item) => item.name),
      axisLabel: {
        color: '#fff',
        fontSize: 12,
        padding: [0, -35, 20, 0],
        formatter: (name, index) => {
          const id = index + 1
          if (id < 4) {
            return `{icon${id}|TOP${id}}`
          } else {
            return `{count|TOP${id}}`
          }
        },
        rich: {
          icon1: {
            width: 30,
            height: 25,
            padding: [5, 0, 2, 0],
            align: 'center',
            backgroundColor: 'transparent',
            color: '#ffffff',
            fontSize: 12
          },
          icon2: {
            width: 30,
            height: 25,
            padding: [5, 0, 2, 0],
            align: 'center',
            color: '#ffffff',
            fontSize: 12
          },
          icon3: {
            width: 30,
            height: 25,
            padding: [5, 0, 2, 0],
            align: 'center',
            color: '#ffffff',
            fontSize: 12
          },
          count: {
            width: 30,
            height: 25,
            padding: [5, 0, 2, 0],
            align: 'center',
            color: '#ffffff',
            fontSize: 12
          }
        }
      }
    },
    {
      type: 'category',
      inverse: true,
      axisTick: 'none',
      axisLine: 'none',
      show: true,
      axisLabel: {
        color: '#fff',
        fontSize: 12,
        formatter: function (value) {
          return value
        }
      },
      data: option2Data.map((item) => item.value)
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: 6, // 柱子宽度
      MaxSize: 0,
      showBackground: true,
      borderRadius: [30, 0, 0, 30],
      backgroundStyle: {
        color: 'rgba(9, 68, 131, .2)'
      },
      label: {
        show: true,
        offset: [50, -10],
        color: '#fff',
        fontWeight: 100,
        position: 'left',
        align: 'left',
        fontSize: 12,
        formatter: function (params) {
          return params.data.name
        }
      },
      data: option2Data.map((item, index) => {
        return {
          name: item.name,
          value: item.value,
          itemStyle: {
            borderRadius: [2, 0, 0, 2],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: ['#FC7A24', '#FFC000', '#FFEA97', '#49B1FF', '#49B1FF', '#49B1FF'][index]
                },
                {
                  offset: 1,
                  color: ['#FF4B01', '#FF7B00', '#FFE823', '#2379FF', '#2379FF', '#2379FF'][index]
                }
              ]
            }
          }
        }
      })
    },
    {
      name: '外圆',
      type: 'scatter',
      emphasis: {
        scale: false
      },
      symbol: 'rect',
      symbolSize: [2, 8], // 进度条白点
      itemStyle: {
        borderRadius: [30, 0, 0, 30],
        color: '#FFF',
        shadowColor: 'rgba(255, 255, 255, 0.5)',
        shadowBlur: 5,
        borderWidth: 1,
        opacity: 1
      },
      z: 2,
      data: option2Data,
      animationDelay: 500
    }
  ]
}

const option3 = {
  series: [
    {
      name: '年度完成进度',
      type: 'liquidFill',
      radius: '90%',
      center: ['50%', '50%'],
      backgroundStyle: {
        color: 'transparent'
      },
      data: [0.5, 0.5],
      amplitude: 20, //水波振幅
      label: {
        //标签设置
        position: ['50%', '45%'],
        formatter: '50%', //显示文本,
        fontSize: '36px', //文本字号,
        color: '#fff'
      },
      outline: {
        borderDistance: 3,
        itemStyle: {
          borderWidth: 2,
          borderColor: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#007DFF'
              },
              {
                offset: 0.6,
                color: 'rgba(45, 67, 114, 1)'
              },
              {
                offset: 1,
                color: 'rgba(45, 67, 114, 1)'
              }
            ],
            globalCoord: false
          }
        }
      },
      itemStyle: {
        color: new globalEcharts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 1,
            color: 'rgba(31, 222, 225, 1)'
          },
          {
            offset: 0.85,
            color: '#007DFF80'
          },
          {
            offset: 0.35,
            color: '#004a99'
          },
          {
            offset: 0,
            color: 'rgba(31, 222, 225, 1)'
          }
        ])
      }
    }
  ]
}

let option5Data = [
  { value: 645, name: '一组对象' },
  { value: 890, name: '二组对象' },
  { value: 560, name: '三组对象' },
  { value: 587, name: '四组对象' }
]
const option5 = {
  //你的代码
  color: ['#156AEA', '#DDB31F', '#80EA15', '#00F0F0'],
  tooltip: {
    show: true,
    backgroundColor: 'rgba(13,5,30,.6)',
    borderWidth: 1,
    borderColor: '#32A1FF',
    padding: 5,
    color: '#fff',
    confine: true,
    formatter(params) {
      if (params.name === '') {
        return ''
      }
      return `${params.name} : ${params.value}人 占比 : ${params.percent}%`
    }
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['30%', '65%'],
      center: ['52%', '55%'], // 修改为居中
      avoidLabelOverlap: true,
      label: {
        color: '#fff',
        alignTo: 'labelLine',
        formatter: '{name|{b}}：{num|{c}}人 \n{zb|{d}}%',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
        rich: {
          num: {
            fontSize: 12,
            color: '#FFFFFF'
          },
          zb: {
            fontSize: 12,
            color: '#FFFFFF'
          }
        }
      },
      labelLine: {
        length: 15,
        length2: 20,
        maxSurfaceAngle: 50
      },
      data: option5Data
    }
  ]
}

const option6 = {
  grid: {
    left: '2%',
    right: '5%',
    top: '10%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    name: '月份',
    type: 'category',
    boundaryGap: false, // 紧挨边缘
    axisTick: {
      // x轴上的小刻度
      show: false
    },
    axisLabel: {
      margin: 15 // x轴距离文字距离
    },
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
  },
  yAxis: {
    type: 'value',
    splitNumber: 9, // 设置y轴刻度间隔个数
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dotted', // dotted 虚线 solid 实线
        color: 'rgba(255, 255, 255,0.3)'
      }
    },
    axisLabel: {
      color: '#A1A7B3',
      fontSize: 12
    }
  },
  series: [
    {
      data: [200, 73, 110, 132, 125, 100, 150],
      type: 'line',
      smooth: true, // 平滑过渡
      symbol: 'none', // 拐点设置为实心圆点 默认是空心圆点 ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' 可以通过 'image://url' 设置为图片，其中 URL 为图片的链接
      lineStyle: {
        width: 1,
        color: '#50e3c2',
        type: 'solid'
      },
      areaStyle: {
        color: 'rgba(80, 227, 194, 0.3)'
      }
    }
  ]
}

const option7 = {
  series: [
    {
      name: '年度完成进度',
      type: 'liquidFill',
      radius: '90%',
      center: ['50%', '50%'],
      backgroundStyle: {
        color: 'transparent'
      },
      data: [0.5, 0.5],
      amplitude: 20, //水波振幅
      label: {
        //标签设置
        position: ['50%', '45%'],
        formatter: '50%', //显示文本,
        fontSize: '36px', //文本字号,
        color: '#fff'
      },
      outline: {
        borderDistance: 3,
        itemStyle: {
          borderWidth: 2,
          borderColor: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#007DFF'
              },
              {
                offset: 0.6,
                color: 'rgba(45, 67, 114, 1)'
              },
              {
                offset: 1,
                color: 'rgba(45, 67, 114, 1)'
              }
            ],
            globalCoord: false
          }
        }
      },
      itemStyle: {
        color: new globalEcharts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 1,
            color: 'rgba(31, 222, 225, 1)'
          },
          {
            offset: 0.85,
            color: '#007DFF80'
          },
          {
            offset: 0.35,
            color: '#004a99'
          },
          {
            offset: 0,
            color: 'rgba(31, 222, 225, 1)'
          }
        ])
      }
    }
  ]
}
</script>

<style scoped lang="scss">
$pageWidth: 1920px;
$pageHeight: 1080px;
$pageHeader: 105px;
$pageFooter: calc($pageHeight - $pageHeader);
$titleHeight: 40px;
$echartHeight: calc($pageFooter - 120px);

.zn-content {
  position: relative;
  z-index: 5;
  width: $pageWidth; // 页面的总宽度
  height: $pageHeight; // 页面的总高度度
  overflow: hidden;
  background: url('../assets/images/bg.jpg') no-repeat;
}

// 上  顶部 标题
.content-header {
  width: $pageWidth; // 页面的总宽度
  height: $pageHeader; // 页面顶部的高度
  text-align: center;
  font-size: 36px;
  line-height: $pageHeader;
  background: url('../assets/images/head_bg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-weight: bold;
  letter-spacing: 6px;
}
// 下 echarts 表格
.content-center {
  width: $pageWidth; // 页面的总宽度
  height: $pageFooter; //页面底部的高度
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.center-left,
.center-right {
  width: $pageWidth * 0.25; // 左右两边的宽度
  height: $pageFooter; // 所有两边的总高度
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.center-center {
  width: $pageWidth * 0.5; // 中间的宽度
  height: $pageFooter;
  display: flex;
  flex-direction: column;
}

.center-top,
.center-bottom {
  width: 100%;
  height: $pageFooter; // 每个 echarts 的高度
  display: flex;
  justify-content: space-between;
  .center-top {
    width: 100%;
    height: $pageFooter * 0.65; // 地图的高度
  }
  .center-bottom {
    width: 100%;
    height: $pageFooter * 0.32; // table 的高度
  }
}

// 左右两边 echarts 大小
.echart-size {
  width: 480px;
  height: $echartHeight * 0.33; // 每个 echarts 高度
  background-image: url('../assets/images/grid.png');
}

// :deep  或者 ::v-deep
:deep(.el-card) {
  background: transparent;
  border: none;
}
::v-deep(.el-card .el-card__body) {
  padding: 0;
  background-color: transparent !important;
}
</style>

<template>
  <div class="box">web3d</div>
  <TitleNav title="标题" />

  <div class="container" ref="container"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'

const THREE = inject('globalThree')
const stats = new Stats()
const gui = new GUI()
gui.close()
// watch(
//   () => obj.value.x,
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal)
//   }
// )

const width = window.innerWidth
const height = window.innerHeight
const container = ref(null)

// 1. ----------------------------------------------------------

const scene = new THREE.Scene() // 创建一个 场景

/**
 * BoxGeometry(长，宽，高) 长方体
 * SphereGeometry(半径) 球体
 * CylinderGeometry(顶部半径，底部半径，高度) 圆柱缓冲几何体
 * PlaneGeometry(宽，高) 平面缓冲几何体
 * CircleGeometry(半径) 圆形缓冲几何体
 *
 **/
const geometry = new THREE.BoxGeometry(60, 60, 60) // 给场景添加一个三维物体

/**
 * MeshBasicMaterial 不受光照影响
 * MeshLambertMaterial 非光泽的材质
 * MeshPhongMaterial 高光的材质
 *
 * **/
const material = new THREE.MeshPhongMaterial({
  color: 0xfff444
  // transparent: true,
  // opacity: 1,
  // shininess: 20,
  // side: THREE.DoubleSide // 双面可见 THREE.FrontSide 正面可见 THREE.BackSide 反面可见
  // specular: '#fff'
}) // 给物体添加材质(颜色)
const mesh = new THREE.Mesh(geometry, material) // 创建一个网格模型(承载物)：将几何体和材质结合
// mesh.position.set(0, 0, 0) // 设置位置 默认 坐标圆点
scene.add(mesh) // 把网格模型(承载物) 添加到 场景中
// 批量渲染
// for (let i = 0; i < 10; i++) {
//   // const mesh = new THREE.Mesh(geometry, material) // 创建一个网格模型(承载物)：将几何体和材质结合
//   // mesh.position.set(i * 60, 0, 0) // 沿着 x 轴创建 10 个
//   // scene.add(mesh) // 把网格模型(承载物) 添加到 场景中
//   for (let j = 0; j < 10; j++) {
//     // const mesh = new THREE.Mesh(geometry, material) // 创建一个网格模型(承载物)：将几何体和材质结合
//     // mesh.position.set(i * 60, 0, j * 60) // 沿着 x z 轴创建 10 个
//     // scene.add(mesh) // 把网格模型(承载物) 添加到 场景中
//     for (let k = 0; k < 10; k++) {
//       const mesh = new THREE.Mesh(geometry, material) // 创建一个网格模型(承载物)：将几何体和材质结合
//       mesh.position.set(i * 60, k * 60, j * 60) // 沿着 x z y轴创建 10 个
//       scene.add(mesh) // 把网格模型(承载物) 添加到 场景中
//     }
//   }
// }
const colorMenu = gui.addFolder('颜色')
colorMenu.close()
const lineMenu = gui.addFolder('轴')
lineMenu.close()
const obj = ref({
  x: 20,
  y: 30,
  z: 0,
  color: '0x00ffff',
  scale: 1
})
lineMenu
  .add(obj.value, 'x', -100, 100)
  .step(10)
  .onChange((value) => {
    mesh.position.x = value
  })
  .name('x轴')
colorMenu
  .addColor(obj.value, 'color')
  .name('颜色')
  .onChange((value) => {
    mesh.material.color.set(value)
  })
lineMenu
  .add(obj.value, 'scale', [-50, 0, 50])
  .name('Y轴')
  .onChange((value) => {
    mesh.position.y = value
  })

// 5. ---------------------------------------------------------

const axes = new THREE.AxesHelper(50) // 创建一个三维坐标轴
scene.add(axes) // 把三维坐标添加到模型场景中

// 6. --------------------------------------------------------
const pointLight = new THREE.PointLight(0xffffff, 1.0) // 创建一个光源对象 点光源
// pointLight.intensity = 10.0 // 设置点光源
pointLight.decay = 0.0 // 不随着距离的改变 光线而衰减
// pointLight.position.set(100, 200, 100) // 设置点光源的位置
scene.add(pointLight) // 把点光源添加到场景中
// 可视化点光源
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
// scene.add(pointLightHelper)
// 添加一个环境光
const ambient = new THREE.AmbientLight('#fff', 0.5)
scene.add(ambient)
const lightMenu = gui.addFolder('光线')
lightMenu.close()
lightMenu.add(ambient, 'intensity', 0, 3).name('环境光').step(0.1)

// 添加一个平行光
const directionalLight = new THREE.DirectionalLight('#fff', 1)
directionalLight.position.set(200, 150, 200)
// directionalLight.tatget = mesh // 目标 不设置就是 原点
scene.add(directionalLight)
lightMenu.add(directionalLight, 'intensity', 0, 5).name('平行光').step(0.1)
// 可视化平行光
// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10)
// scene.add(dirLightHelper)

// 2. ----------------------------------------------------------
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 3000) // 创建一个透视投影相机对象
camera.position.set(200, 200, 200) // 设置相机的位置
camera.lookAt(0, 0, 0) // 相机的视线 观察目标点的坐标
// camera.lookAt(0,10,0)
// camera.lookAt(mesh.position)

/**
 * 3. ----------------------------------------------------------
 *
 * WebGL 渲染器设置
 *
 *
 **/
const render = new THREE.WebGLRenderer({
  antialias: true // 抗锯齿
}) // 创建一个渲染器对象
render.setSize(width, height) // 设置 canvas 画布的大小
render.setPixelRatio(window.devicePixelRatio) // 设置设备像素比

// render.render(scene, camera) // 执行渲染条件 把渲染结果 输出到页面上

// 4. -----------------------------------------------------------
//  OrbitControls 使物体可以缩放 旋转
const controls = new OrbitControls(camera, render.domElement)
// 如果 OrbitControls 改变了相机参数 重新调用渲染器渲染三维场景
// controls.addEventListener('change', () => {
//   // render.render(scene, camera) // 执行渲染操作
// })

// 7. --------------------------------------------------------
// 循环渲染 // 周期性执行 默认理想状态下每秒执行 60 次
const clock = new THREE.Clock()
const renderFun = () => {
  // stats.update() // 更新 帧率
  // const spt = clock.getDelta() * 1000 // 获取时间 单位 毫秒
  // console.log('spt', spt)
  // console.log('渲染帧数', 1000 / spt)
  // mesh.rotateY(0.01) // 旋转 y 轴
  render.render(scene, camera) // 执行渲染操作
  requestAnimationFrame(renderFun) //
}

onMounted(() => {
  container.value.appendChild(render.domElement)
  // container.value.appendChild(stats.domElement)
  renderFun()
})

// 页面尺寸更改
window.addEventListener('resize', () => {
  render.setSize(window.innerWidth, window.innerHeight) // 更新 canvas 画布尺寸
  camera.aspect = window.innerWidth / window.innerHeight // 设置宽高比
  camera.updateProjectionMatrix()
})

// Scene 场景
// Camera  相机
// Renderer  渲染器
</script>
<style scoped lang="scss">
.container {
  overflow: hidden;
}
</style>

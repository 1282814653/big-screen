<template>
  <div class="box">web3d</div>
</template>
<script setup>
const three = inject('globalThree')
// 1. ----------------------------------------------------------
// 创建一个 场景
const scene = new three.Scene()
// 给场景添加一个三维物体
const geometry = new three.BoxGeometry(100, 100, 100)
// 给物体添加材质(颜色)
const material = new three.MeshBasicMaterial({ color: 0x00ff00 })
// 创建一个网格模型(承载物)：将几何体和材质结合
const mesh = new three.Mesh(geometry, material)
// 设置位置
mesh.position.set(0, 10, 0)

// 把网格模型(承载物) 添加到 场景中
scene.add(mesh)
// 2. ----------------------------------------------------------
// 创建一个透视投影相机对象
const camera = new three.PerspectiveCamera(30, 1.6, 0.1, 3000)
// 设置相机的位置
camera.position.set(200, 200, 200)
// 相机的视线 观察目标点的坐标
camera.lookAt(0, 0, 0)
// camera.lookAt(0,10,0)
// camera.lookAt(mesh.position)

// Scene 场景
// Camera  相机
// Renderer  渲染器
</script>
<style scoped lang="scss"></style>

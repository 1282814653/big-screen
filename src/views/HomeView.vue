<template>
  <div class="zn-app">
    <el-card class="el-card">
      <router-link class="link" to="/web3d" target="_blank"> WEB3D </router-link>
    </el-card>
    <el-card class="el-card">
      <router-link class="link" to="/big-screen" target="_blank"> 大屏 </router-link>
    </el-card>

    <el-button @click="handleBtn">按钮</el-button>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { demo } from '@/api/index.js'

const route = useRoute()
const router = useRouter()

const handleBtn = async () => {
  await demo().then((res) => {
    console.log('res...', res)
  })
}
</script>
<style scoped lang="scss">
.zn-app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.el-card {
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link {
  text-decoration: none;
}
.link:hover {
  color: orange;
}
</style>

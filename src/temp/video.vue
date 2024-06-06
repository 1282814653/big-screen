<template>
  <div class="video--main" v-loading="isShowLoading">
    <video
      id="videoPlayer"
      ref="videoPlayer"
      autoplay
      @playing="handleOnplays"
      style="width: 100%; height: 100%; object-fit: cover"
    ></video>
  </div>
</template>

<!-- flv 视频流 -->
<script setup>
import flvjs from 'flv.js'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
const flvPlayer = ref(null)

const url = userStores.ehumanUrl || '/chatgpt/flv?port=1935&app=chatgpt&stream=ehuman'

onMounted(() => {
  createVideo(url)
})

let isShowLoading = ref(false)

let videoPlayer = ref('')
const createVideo = (url) => {
  isShowLoading.value = true
  if (flvjs.isSupported()) {
    let videoElement = document.getElementById(videoPlayer.value.id)
    flvPlayer.value = flvjs.createPlayer(
      {
        type: 'flv',
        url: url, //媒体URL，可以以'https(s)'或'ws(s)'（WebSocket）开头
        isLive: true, // 实时流
        hasAudio: true, // 流是否有音频轨道
        hasVideo: true // 流中是否有视频轨道
      },
      {
        cors: true, // 是否跨域
        enableStashBuffer: false, // 启用IO隐藏缓冲区
        fixAudioTimestampGap: false,
        isLive: true,
        lazyLoad: true, // 如果有足够的数据可播放，则中止http连接。
        autoCleanupSourceBuffer: true // 是否自动清理缓存
      }
    )
    flvPlayer.value.attachMediaElement(videoElement)
    flvPlayer.value.load()

    setTimeout(function () {
      flvPlayer.value.play()
    }, 300)

    setTimeoutStatus.value = setTimeout(() => {
      isShowLoading.value = false
    }, 10000)
    //处理视频播放错误的语法
    flvPlayer.value.on('error', () => {
      return ElMessage.error('视频加载失败，请稍候重试！')
    })
  }
}

const setTimeoutStatus = ref(0)
const handleOnplays = (e) => {
  nextTick(() => {
    isShowPlayIcon.value = false
    isShowLoading.value = false
  })
}

const isShowPlayIcon = ref(true)

const handlePlayIcon = () => {
  createVideo(url)
  flvPlayer.value.play()
}

const handleNoPlayIcon = () => {
  isShowLoading.value = false
  flvPlayer.value.pause() //暂停播放数据流
  flvPlayer.value.unload() //取消数据流加载
  flvPlayer.value.detachMediaElement() //将播放实例从节点中取出
  flvPlayer.value.destroy() //销毁播放实例
  flvPlayer.value = null
}

onUnmounted(() => {
  handleNoPlayIcon()
  clearTimeout(setTimeoutStatus)
})

defineExpose({
  handlePlayIcon,
  handleNoPlayIcon
})
</script>

<style lang="scss" scoped></style>

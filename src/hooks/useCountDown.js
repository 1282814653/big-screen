import { computed, onUnmounted, ref, watch } from 'vue'
import { sendSmsVcodeToMe, sendSmsVcode } from '@/api/login.js'
import { ElMessage } from 'element-plus'

// 倒计时
export default function useCountDown() {
  const codeTime = ref(60) // 倒计时时间
  const isCountDown = ref(false) // 是否开启倒计时
  let timerId = '' // 定时器 ID

  onUnmounted(() => clearInterval(timerId)) // 清除定时器

  // 倒计时文本
  const dynamicText = computed(() => (isCountDown.value ? codeTime.value + 's' : '获取验证码'))

  // 启动/停止倒计时
  watch(isCountDown, (newVal) => {
    if (newVal) {
      // 启动倒计时
      timerId = setInterval(() => {
        if (codeTime.value > 1) codeTime.value -= 1
        else {
          //停止倒计时
          clearInterval(timerId)
          isCountDown.value = false
          codeTime.value = 60
        }
      }, 1000)
    } else {
      // 停止倒计时
      clearInterval(timerId)
    }
  })
  // 倒计时
  const getCodeHandle = async (phone) => {
    let res
    if (!phone) res = await sendSmsVcodeToMe()
    else res = await sendSmsVcode({ phone })

    if (res.code !== 1) return ElMessage.error(res.msg)
    // ElMessage.success('验证码发送成功');
    isCountDown.value = true
  }

  return {
    dynamicText,
    getCodeHandle
  }
}

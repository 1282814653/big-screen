import { ref } from 'vue'

// 获取验证码

export const authCode = () => {
  let codeTitle = ref('')
  let isShowCodeBtn = ref(true)
  let timer = ref(0)
  function handleAuthCode(count = 60) {
    timer.value = setInterval(() => {
      if (count > 0) {
        count--
        codeTitle.value = count + 's重新获取'
        isShowCodeBtn.value = false
      } else if (count == 0) {
        codeTitle.value = '重新获取'
        isShowCodeBtn.value = true
      } else {
        codeTitle.value = '获取验证码'
        isShowCodeBtn.value = true
      }
    }, 1000)
  }

  return {
    codeTitle,
    isShowCodeBtn,
    handleAuthCode
  }
}

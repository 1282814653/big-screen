import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const service = axios.create({
  baseURL: '',
  headers: {
    'Content-Length': 'application/json;charset=utf-8'
  },
  timeout: 10000,
  withCredentials: true // 跨域请求时发送cookie
})

// 请求
service.interceptors.request.use(
  (config) => {
    // 如果需要 携带 token 在此添加
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应
service.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data

    if (code == 0) {
      return response.data
    }

    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response
    }

    return Promise.reject(new Error(msg) || 'Error')
  },
  (error) => {
    // 根据 error.response.status 判断错误类型

    ElMessage.error(message || `后端接口未知异常`)
    return Promise.reject(error)
  }
)

export default service

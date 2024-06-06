import request from '@/utils/request'

export function demo() {
  return request({
    url: '/login',
    method: 'get'
  })
}

import { dataList } from './list'

export default [
  {
    url: '/login',
    method: 'get',
    response: (res) => {
      // console.log('res... mock', res)
      return {
        code: 0,
        msg: '成功',
        data: dataList
      }
    }
  }
]

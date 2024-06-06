export default [
  {
    url: '/api/login',
    method: 'post',
    response: (res) => {
      return {
        code: 0,
        data: '成功'
      }
    }
  }
]

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * @params {Function} getListRequest  查询接口
 * @params {Function} delteAsync      刪除接口
 * @params {Object}   listQuery       查询参数
 * @params {String}   kw              接口关键字
 *
 */
export function useBase(getListRequest, delteAsync, listQuery, kw) {
  let list = ref([]) //table 列表
  let total = ref(0) //总数

  // 查询列表
  const getList = async () => {
    let res = await getListRequest(listQuery)
    if (res.code != 0) return ElMessage.error(res.msg)
    // S/x/ch/sh  结尾加es
    const S = kw.charAt(kw.length - 1) == 's' ? 'es' : 's' //兼容复数加es 的情况
    list.value = res.data[kw + S]
      ? res.data[kw + S].sort((a, b) => b.createTime - a.createTime)
      : [] //按时间排序
    // list.value = res.data[kw + S] || []
  }
  // 查询列表总数
  const getListLen = async () => {
    let params = JSON.parse(JSON.stringify(listQuery))
    params.start = 1
    params.isSum = 1
    let res = await getListRequest(params)
    if (res.code != 0) return ElMessage.error(res.msg)
    total.value = (res.data.sum && res.data.sum.count) || 0
  }
  // 查询事件
  const handleSearch = () => {
    getList()
    getListLen()
  }
  // 重置
  const handleReset = (formRef) => {
    formRef.resetFields()
    listQuery.start = 1
    handleSearch()
  }
  //  删除
  const deleteItem = (id, index) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
      type: 'warning'
    }).then(async () => {
      let res = await delteAsync({ [kw + 'Id']: id })
      if (res.code != 0) return ElMessage.error(res.msg)
      ElMessage.success('删除成功')
      list.value.splice(index, 1)
      // getList()
      getListLen()
    })
  }

  // 改变每页数目
  const handleSizeChange = (val) => {
    listQuery.count = val
    getList()
  }
  // 操作分页
  const handleCurrentChange = (val) => {
    listQuery.currPage = val
    listQuery.start = listQuery.count * (val - 1) + 1
    getList()
  }

  return {
    list,
    total,
    getList,
    getListLen,
    handleSearch,
    handleReset,
    deleteItem,
    handleSizeChange,
    handleCurrentChange
  }
}

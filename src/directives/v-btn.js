import { useCounterStore } from '@/stores/counter'
const { btnList } = useCounterStore()
console.log('btnList..', btnList)
export function VBtn(app) {
  app.directive('btn', (el, binding) => {
    let numArr = [1, 5]
    const { value } = binding
    let bol = numArr.includes(value) ? true : false
    if (!bol) el.parentNode && el.parentNode.removeChild(el)
    return bol
  })
}

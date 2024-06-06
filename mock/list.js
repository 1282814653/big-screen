import Mock from 'mockjs'
// 内存模拟数据
const dataList = []
for (let i = 0; i < 33; i++) {
  dataList.push({
    id: Mock.mock('@guid'),
    name: Mock.mock('@cname'),
    title: Mock.mock('@ctitle(5, 10)'),
    address: Mock.mock('@county(true)'),
    place: Mock.mock('@county(true)'),
    tel: Mock.mock('@integer(1000000000, 1999999999)'),
    sex: Mock.mock('@integer(0, 1)'),
    date: Mock.mock('@date("yyyy-MM-dd")'),
    time: Mock.mock('@time("HH:mm:ss")'),
    content: Mock.mock('@cparagraph(1, 3)'),
    img: Mock.mock('@image("200x100", "#000", "#FFF", "png", "Mock.js")'),
    flag: Mock.mock('@boolean'),
    number: Mock.mock('@integer(1, 100)'),
    list: Mock.mock('@array(5, 10)')
  })
}
export { dataList }

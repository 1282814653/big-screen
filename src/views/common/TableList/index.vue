<template>
  <div class="table">
    <div class="table-title title">
      <div class="index">id</div>
      <div class="province">省份</div>
      <div class="hospital-name">医院名称</div>
      <div class="salesman">销售人员</div>
      <div class="maintainman">运维人员</div>
      <div class="date">日期</div>
    </div>
    <vue3-seamless-scroll :list="tableList" class="scroll" hover :limitScrollNum="6" :step="0.3">
      <div class="table-title table-row" v-for="(item, index) in tableList" :key="index">
        <span class="index">{{ index }}</span>
        <span class="province">{{ item.city }}</span>
        <span class="hospital-name">{{ item.hospitalName }}</span>
        <span class="salesman">{{ item.salesman }}</span>
        <span class="maintainman">{{ item.maintainman }}</span>
        <span class="date">{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const tableList = ref([
  {
    title: 'Vue3.0 无缝滚动组件展示数据第1条',
    city: '江苏',
    hospitalName: '江苏医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第2条',
    city: '河南',
    hospitalName: '河南医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第3条',
    city: '湖北',
    hospitalName: '湖北医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第4条',
    city: '浙江',
    hospitalName: '浙江医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第5条',
    city: '安徽',
    hospitalName: '安徽医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第6条',
    city: '江西',
    hospitalName: '江西医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第7条',
    city: '湖南',
    hospitalName: '湖南医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第8条',
    city: '四川',
    hospitalName: '四川医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  },
  {
    title: 'Vue3.0 无缝滚动组件展示数据第9条',
    city: '山西',
    hospitalName: '山西医院',
    salesman: '张三',
    maintainman: '李四',
    financeman: '王五',
    contractman: '马六',
    date: Date.now()
  }
])
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  height: 100%;
  background: url('../../../assets/images/grid.png');
}
.table-title {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #fff;
}
.title:nth-child(1) {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dashed #333;
}

.table-row {
  height: 45px;
  line-height: 45px;
}
.index {
  width: 2.6042vw;
  //   background: #000;
}
.province,
.salesman,
.maintainman {
  width: 5.2083vw;
}
.salesman {
  //   background-color: aqua;
}
.hospital-name {
  //   background: red;
  width: 13.0208vw;
}
.date {
  width: 7.8125vw;
  //   background: #000;
}
.scroll {
  height: 100%;
  width: 100%;
  margin: auto;
  overflow: hidden;
}
</style>

<template>
  <div class="title--nav">
    <div v-if="title">{{ title }}</div>
    <slot v-else></slot>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style scoped lang="scss">
.title--nav {
  width: 100%;
  color: #fff;
  height: 40px;
  font-size: 18px;
  padding-left: 5px;
  line-height: 40px;
  text-align: left;
}
</style>

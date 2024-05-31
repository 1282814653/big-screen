<template>
  <div class="line-animation">
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  }
})
</script>
<style scoped lang="scss">
.line-animation {
  position: relative;
  margin: auto;
  text-align: center;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #19a5e4;
    transition: all 0.5s;
    animation: clippath 3s infinite linear;
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 95% 0);
  }

  25% {
    clip-path: inset(0 95% 0 0);
  }
  50% {
    clip-path: inset(95% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 95%);
  }
}
</style>

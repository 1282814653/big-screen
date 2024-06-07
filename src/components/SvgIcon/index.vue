<template>
  <svg
    aria-hidden="true"
    :class="svgClass"
    :style="{
      width: iconSize + 'px',
      height: iconSize + 'px'
    }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
const props = defineProps({
  iconPrefix: {
    type: String,
    default: 'icon'
  },
  iconName: {
    type: String,
    required: true
  },
  iconSize: {
    type: [Number, String],
    default: 12
  },
  className: {
    type: String,
    default: ''
  }
})
const symbolId = computed(() => `#${props.iconPrefix}-${props.iconName}`)
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.2em;
  fill: currentColor;
  overflow: hidden;
}
</style>

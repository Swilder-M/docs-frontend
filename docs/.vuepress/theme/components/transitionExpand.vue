<template>
  <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionExpand',
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0

      // 强制触发重绘，确保动画被正确地执行
      getComputedStyle(element).height

      // 触发动画
      // 这里使用 setTimeout
      // 确保浏览器已经完成 height = 0 的设置
      setTimeout(() => {
        element.style.height = height
      })
    },

    afterEnter(element) {
      element.style.height = 'auto'
    },

    leave(element) {
      const height = getComputedStyle(element).height

      element.style.height = height

      // 强制重绘保证动画被正确地触发
      getComputedStyle(element).height

      setTimeout(() => {
        element.style.height = 0
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.25s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>

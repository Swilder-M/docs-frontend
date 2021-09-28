<template>
  <div
    class="not-find container has-text-centered is-flex is-align-items-center is-justify-content-center"
    style="min-height: 100vh"
  >
    <div class="columns is-centered">
      <div class="column is-narrow">
        <div style="max-width: 460px">
          <img loading="lazy" class="mt-0 mb-5" src="~public/docs-images/404.png" alt="404" />
          <h1 class="mt-0 mb-5 is-size-4">{{ msg }}</h1>
          <a class="back-home" :href="backHomeLink">{{ backHome }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backHomeLink: '/en/',
      backHome: 'Take me home',
      msg: "There's nothing here.",
      msgs: [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `Looks like we've got some broken links.`,
      ],
    }
  },

  mounted() {
    if (this.$route.path.includes('/zh/')) {
      this.msg = '抱歉，你访问的页面不存在。'
      this.backHome = '返回首页'
      this.backHomeLink = '/zh/'
    } else {
      this.msg = this.msgs[Math.floor(Math.random() * this.msgs.length)]
    }
  },
}
</script>

<style lang="scss">
@import '../styles/scss/base.scss';
</style>

<template>
  <footer class="main-footer-box has-text-centered-mobile">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <div class="is-flex is-flex-direction-column is-justify-content-space-between" style="height: 100%">
            <div class="mb-5">
              <a :href="`https://www.emqx.com/${$lang}`" target="_blank" rel="noopener">
                <img src="/images/logo.png" alt="EMQ LOGO" class="logo" />
              </a>
            </div>
            <div>
              <img
                v-if="$lang === 'zh'"
                loading="lazy"
                src="/images/qr-code.png"
                alt="EMQ 映云科技公众号二维码"
                class="qr-code mb-3"
                width="146"
                height="146"
              />
              <div class="follow-us">
                <a
                  v-for="(followItem, index) in followList"
                  :key="index"
                  :href="followItem.link"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="`#${followItem.icon}`"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ul v-for="(cols, title) in columns" :key="title" class="column m-0">
          <li>
            <h5 class="mt-0 mb-3">{{ title }}</h5>
          </li>
          <li v-for="(col, index) in cols" :key="index">
            <a :href="col.link">{{ col.title }}</a>
          </li>
        </ul>
      </div>
      <div class="record-information columns is-gapless is-vcentered">
        <div class="column">
          <p class="m-0">
            © 2021
            <a :href="$lang === 'zh' ? 'https://www.emqx.com/zh' : 'https://www.emqx.com/en'">
              EMQ
            </a>
            Technologies Co., Ltd. All rights reserved
          </p>
        </div>
        <div class="has-text-right-tablet column">
          <a v-if="$lang === 'zh'" href="https://beian.miit.gov.cn/">
            浙ICP备17021694号-4
          </a>
          <!-- <a
            v-for="(followItem, index) in followList"
            :key="index"
            :href="followItem.link"
            target="_blank"
            rel="noopener"
          >
            <img :src="followItem.img" />
          </a>
          <a class="wechat" v-if="$lang === 'zh'" href="javascript:;">
            <img src="/images/wechat.png" />
            <img class="qr-code" src="https://static.emqx.net/images/new-mails/qr_code.png" />
          </a> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    columns() {
      const { footerConfig } = this.$themeConfig
      return footerConfig[this.$lang].columns
    },
    followList() {
      const { footerConfig } = this.$themeConfig
      return footerConfig[this.$lang].followList
    },
  },
}
</script>

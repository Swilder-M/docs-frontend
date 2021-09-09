<template>
  <footer class="main-footer-box reset-width">
    <div class="columns">
      <ul v-for="(cols, title) in columns" :key="title" class="column">
        <li>
          <h5>{{ title }}</h5>
        </li>
        <li v-for="(col, index) in cols" :key="index">
          <a :href="col.link">{{ col.title }}</a>
        </li>
      </ul>
    </div>
    <div class="record-information columns is-gapless is-vcentered">
      <div class="column">
        <p>
          © 2021
          <a
            :href="$lang === 'cn' ? 'https://www.emqx.com/zh' : 'https://www.emqx.com/en'"
            style="color:#9b9c9d"
          >
            EMQ
          </a>
          Technologies Co., Ltd. All rights reserved
        </p>
      </div>
      <div class="follow-us column">
        <a
          v-for="(followItem, index) in followList"
          :key="index"
          :href="followItem.link"
          target="_blank"
          rel="noopener"
        >
          <img :src="followItem.img" />
        </a>
        <a class="wechat" v-if="$lang === 'cn'" href="javascript:;">
          <img src="/images/wechat.png" />
          <img class="qr-code" src="https://static.emqx.net/images/new-mails/qr_code.png" />
        </a>
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

<template>
  <footer class="main-footer-box has-text-centered-mobile">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <h2 class="m-0 p-0 is-size-3">{{ translations.title }}</h2>
        </div>
        <div id="form-mail" class="column is-6 is-offset-1 form-mail">
          <div class="is-flex">
            <input
              v-model="emailAddress"
              id="inputEmail"
              type="email"
              required
              name="inputEmail"
              :class="['form-control', 'mr-4', { 'error-input': isError }, { 'success-input': isSuccess }]"
              :placeholder="translations.emailAddress"
              @focus="clearError"
            />
            <button :class="['button', 'is-gradient', 'px-5', 'm-0', { 'is-loading': loading }]" @click="newsLetter">
              {{ translations.subscribe }} →
            </button>
            <p :class="{ 'sub-tips': true, 'm-0': true, 'is-error': isError, 'is-success': isSuccess }">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column is-flex-grow-3 is-flex-shrink-0">
          <div class="is-flex is-flex-direction-column is-justify-content-space-between" style="height: 100%">
            <div class="mb-5">
              <a :href="`https://www.emqx.com/${$lang}`" target="_blank" rel="noopener">
                <img src="~public/docs-images/logo.png" alt="EMQ LOGO" class="logo" />
              </a>
            </div>
            <div>
              <img
                v-if="$lang === 'zh'"
                loading="lazy"
                src="~public/docs-images/qr-code.png"
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
        <ul
          v-for="(cols, title) in columns"
          :key="title"
          :class="['column', 'is-narrow', 'm-0', { 'is-flex-grow-1': !['热门主题', 'Popular Topics'].includes(title) }]"
        >
          <li>
            <h5 class="mt-0 mb-3">{{ title }}</h5>
          </li>
          <li v-for="(col, index) in cols" :key="index">
            <a :href="col.link" target="_blank" rel="noopener">{{ col.title }}</a>
          </li>
        </ul>
      </div>
      <div class="record-information columns is-gapless is-vcentered is-centered">
        <div class="column is-narrow">
          <p class="m-0">
            © 2021
            <a :href="$lang === 'zh' ? 'https://www.emqx.com/zh' : 'https://www.emqx.com/en'">
              EMQ
            </a>
            Technologies Co., Ltd. All rights reserved
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      emailAddress: '',
      message: '',
      isError: false,
      isSuccess: false,
      loading: false,
      popularTopics: null,
    }
  },

  computed: {
    columns() {
      const { footerConfig } = this.$themeConfig
      const columns = footerConfig[this.$lang].columns
      if (this.popularTopics) {
        columns[this.$lang === 'zh' ? '热门主题' : 'Popular Topics'] = this.popularTopics
      }
      return footerConfig[this.$lang].columns
    },
    followList() {
      const { footerConfig } = this.$themeConfig
      return footerConfig[this.$lang].followList
    },
    translations() {
      return this.$lang === 'en'
        ? {
            title: 'Subscribe to Our Newsletters',
            emailAddress: 'Email',
            subscribe: 'Subscribe',
            thanksForSub: 'Thanks for subscribing to the newsletter.',
            emailExist: 'Email has exist',
            emailError: 'Not a valid email address',
          }
        : {
            title: '订阅 EMQ 最新资讯',
            emailAddress: '邮箱',
            subscribe: '订阅',
            thanksForSub: '谢谢您的订阅！我们将会实时为您提供最新的资讯。',
            emailExist: '该邮件已订阅',
            emailError: 'Email 格式错误',
          }
    },
  },

  watch: {
    $lang() {
      this.getPopularTopics()
    },
  },

  methods: {
    async getPopularTopics() {
      const { axiosBaseUrl } = this.$themeConfig
      try {
        const { status, data } = await this.$axios.get(`${axiosBaseUrl}/popular_blogs`, {
          headers: { 'Content-Language': this.$lang },
          params: { _limit: 6 },
        })
        if (status === 200 && data.items.length) {
          this.popularTopics = data.items.map(item => {
            return { title: item.title, link: `https://www.emqx.com/${this.$lang}/blog/${item.titleUrl}` }
          })
        }
      } catch (error) {}
    },
    clearError() {
      this.isError = false
      this.isSuccess = false
      this.message = ''
    },
    newsLetter() {
      const pattern = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/
      const isValid = pattern.test(this.emailAddress)
      if (isValid) {
        const data = {
          email: this.emailAddress,
          source: 'docs',
        }
        const { axiosBaseUrl } = this.$themeConfig
        this.loading = true
        this.$axios
          .post(`${axiosBaseUrl}/subscriptions`, data, {
            headers: { 'Content-Language': this.$lang },
          })
          .then(({ status, data }) => {
            if (status === 200 && data) {
              this.message = this.translations.thanksForSub
              this.isError = false
              this.isSuccess = true
            }
          })
          .catch(_error => {
            this.message = this.translations.emailExist
            this.isError = true
            isSuccess = false
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.message = this.translations.emailError
        this.isError = true
        this.isSuccess = false
      }
    },
  },

  created() {
    this.getPopularTopics()
  },
}
</script>

<template>
  <nav v-if="userLinks.length || repoLink" class="nav-links">
    <!-- user links -->
    <div v-for="item in userLinks" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>

    <!-- repo link -->
    <a v-if="repoLink" :href="repoLink" class="repo-link" target="_blank" rel="noopener noreferrer">
      {{ repoLabel }}
      <OutboundLink />
    </a>

    <!-- nav-button -->
    <div class="btns">
      <a class="github nav-item" href="https://github.com/emqx/emqx" target="_blank" rel="noopener">
        <svg class="icon" aria-hidden="true" style="font-size: 20px">
          <use xlink:href="#icon-github"></use>
        </svg>
        {{ starCount || 'Star' }}
      </a>
      <a
        class="downloads nav-item"
        :href="
          $lang === 'zh'
            ? 'https://www.emqx.com/zh/downloads?product=cloud'
            : 'https://www.emqx.com/en/downloads?product=cloud'
        "
        target="_blank"
        rel="noopener"
      >
        {{ $lang === 'zh' ? '免费试用' : 'Try Free' }}
      </a>
    </div>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'NavLinks',

  components: {
    NavLink,
    DropdownLink,
  },

  data() {
    return {
      starCount: null,
    }
  },

  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav() {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = (themeLocales[path] && themeLocales[path].label) || locale.lang
            const products = this.$themeConfig.gitHubConfig[this.$lang].docsType
            let link
            if (path === '/en/') {
              link = `/en/${products}/latest/`
            } else {
              link = `/zh/${products}/latest/`
            }
            return { text, link }
          }),
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },

    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        })
      })
    },

    repoLink() {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
      }
      return null
    },

    repoLabel() {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    },
  },

  methods: {
    async getGitHubStar() {
      const reopApi = 'https://api.github.com/repos/emqx/emqx'
      try {
        const { status, data } = await this.$axios.get(reopApi)
        if (status === 200 && data) {
          this.starCount =
            data.stargazers_count > 1000
              ? Math.round(parseInt(data.stargazers_count, 10) / 100) / 10 + 'k'
              : data.stargazers_count
        }
      } catch (e) {}
    },
  },

  created() {
    this.getGitHubStar()
  },
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0
  .repo-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>

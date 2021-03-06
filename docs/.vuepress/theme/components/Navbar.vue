<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <div class="navbar-left">
      <a class="home-link" :href="`/${$lang}/`">
        <img
          v-if="$site.themeConfig.logo"
          class="logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$lang === 'zh' ? '物联网 MQTT 服务器文档' : 'IoT MQTT Broker Documentations'"
        />
        <span v-if="$siteTitle" ref="siteName" class="site-name" :class="{ 'can-hide': $site.themeConfig.logo }">
          Docs
        </span>
      </a>

      <div class="lang-change">
        <div class="dropdown-wrapper">
          <button type="button" aria-label="Languages" class="dropdown-title">
            <span class="title">
              {{ $lang === 'zh' ? '中文' : 'English' }}
            </span>
            <span class="arrow down"></span>
          </button>
          <ul class="nav-dropdown" style="display: none;">
            <li class="dropdown-item">
              <!---->
              <router-link
                :to="$page.frontmatter.home ? '/en/' : `/en/${product}/${version}/`"
                :class="{ 'nav-link': true, active: $lang === 'en' }"
              >
                English
              </router-link>
            </li>
            <li class="dropdown-item">
              <!---->
              <router-link
                :to="$page.frontmatter.home ? '/zh/' : `/zh/${product}/${version}/`"
                :class="{ 'nav-link': true, active: $lang === 'zh' }"
              >
                中文
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <SearchBox /> -->
    <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" inputId="navbar-algolia-input" />
    <div
      class="links"
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': linksWrapMaxWidth + 'px',
            }
          : {}
      "
    >
      <!-- <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchBox
        v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
      /> -->
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@theme/components/AlgoliaSearchBox'
// import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    // SearchBox,
    AlgoliaSearchBox,
  },

  data() {
    return {
      linksWrapMaxWidth: null,
    }
  },

  computed: {
    algolia() {
      return {
        ...(this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}),
        algoliaOptions: {
          hitsPerPage: 20,
          facetFilters: [`language:${this.$lang}`, `product:${this.product}`],
        },
        debug: process.env.NODE_ENV === 'development',
      }
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },

    product() {
      return this.$themeConfig.gitHubConfig[this.$lang].docsType
    },

    version() {
      return this.$themeConfig.gitHubConfig[this.$lang].version
    },
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>

<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <section class="main-box">
      <div class="columns is-mobile">
        <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
          <template v-if="!isHomePage" #top>
            <VersionPick />
          </template>
          <template #bottom>
            <slot name="sidebar-bottom" />
          </template>
        </Sidebar>
        <Home v-if="isHomePage" />
        <template v-else>
          <div class="column col-page">
            <Page :sidebar-items="sidebarItems" />
          </div>
          <RightSideBar />
        </template>
      </div>
      <Footer />
    </section>
    <page-feedback v-if="!isHomePage" />
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'
import VersionPick from '../components/VersionPick'
import RightSideBar from '../components/RightSideBar'
import Footer from '../components/Footer'
import PageFeedback from '../components/pageFeedback.vue'
import Home from '../components/Home.vue'

export default {
  name: 'Layout',

  components: {
    Navbar,
    Page,
    Sidebar,
    VersionPick,
    RightSideBar,
    Footer,
    PageFeedback,
    Home,
  },

  data() {
    return {
      isSidebarOpen: false,
    }
  },

  watch: {
    isSidebarOpen: function(val) {
      if (val === true) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }
    },
  },

  computed: {
    isHomePage() {
      return this.$page.frontmatter.home
    },

    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return this.$title || themeConfig.logo || themeConfig.repo || themeConfig.nav || this.$themeLocaleConfig.nav
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return !frontmatter.home && frontmatter.sidebar !== false && this.sidebarItems.length
    },

    sidebarItems() {
      return resolveSidebarItems(this.$page, this.$page.regularPath, this.$site, this.$localePath)
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
        },
        userPageClass,
      ]
    },

    product() {
      return this.$themeConfig.gitHubConfig[this.$lang].docsType
    },

    version() {
      return this.$themeConfig.gitHubConfig[this.$lang].version
    },
  },

  created() {
    if (typeof this.$ssrContext !== 'undefined') {
      this.$ssrContext.userHeadTags += `
    <link rel="canonical" href="${this.computeURL()}>
    <meta name="docsearch:language" content="${this.$lang}">
    <meta name="docsearch:product" content="${this.product}">
    <meta name="docsearch:version" content="${this.version}">`
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
    const searchInput = document.querySelector('.search-box > input')
    searchInput.addEventListener(
      'focus',
      () => {
        if (document.body.offsetWidth <= 720) {
          this.isSidebarOpen = false
          document.body.style.overflow = 'hidden'
        }
      },
      false,
    )
    searchInput.addEventListener(
      'blur',
      () => {
        if (document.body.offsetWidth <= 720) {
          document.body.style.overflow = 'visible'
        }
      },
      false,
    )
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      }
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    computeURL() {
      const { domain } = this.$site.themeConfig
      const pagePath = this.$page.path
      return `${domain}${pagePath}`
    },
  },
}
</script>

<style lang="scss">
@import '../styles/scss/base.scss';
</style>

<template>
  <div class="right-column">
    <div class="docs-operation">
      <div class="doc-download improve-doc">
        <a :href="editLink" class="improve-doc" target="_blank" rel="noreferrer">
          {{ editLinkText }}
        </a>
      </div>
      <div class="doc-download feedback-doc">
        <a :href="feedbackLink" target="_blank" rel="noreferrer">
          {{ feedbackLinkText }}
        </a>
      </div>
    </div>
    <section class="doc-toc">
      <div class="title">
        {{ $lang === 'zh' ? '本页导航' : 'What’s on this page' }}
      </div>
      <div class="toc-content">
        <ul>
          <li v-for="(header, index) in docToc" :key="index" :class="{ 'is-active': tocActive === '#' + header.slug }">
            <router-link :to="'#' + header.slug">
              {{ header.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RightSideBar',
  computed: {
    gitHubConfig() {
      const gitHubConfig = this.$lang === 'zh' ? this.$themeConfig.gitHubConfig.zh : this.$themeConfig.gitHubConfig.en
      return gitHubConfig
    },
    editLinkText() {
      return this.gitHubConfig.editLinkText
    },
    editLink() {
      const docsRepo = this.gitHubConfig.docsRepo
      const docsBranch = this.gitHubConfig.docsBranch
      const docsDir = this.gitHubConfig.docsDir
      const prefix = Object.keys(this.$themeLocaleConfig.sidebar)[0]
      const docsPath = ('/' + this.$page.relativePath).replace(prefix, '')
      return `https://github.com/${docsRepo}/edit/${docsBranch}/${docsDir}/${docsPath}`
    },
    feedbackLinkText() {
      return this.gitHubConfig.feedbackLinkText
    },
    feedbackLink() {
      const docsRepo = this.gitHubConfig.docsRepo
      const docsBranch = this.gitHubConfig.docsBranch
      const docsDir = this.gitHubConfig.docsDir
      const prefix = Object.keys(this.$themeLocaleConfig.sidebar)[0]
      const docsPath = ('/' + this.$page.relativePath).replace(prefix, '')
      let href = 'https://docs.emqx.com' + this.$route.path
      return `https://github.com/${docsRepo}/issues/new?body=File:%20[/${docsDir}/${docsPath}](${href})`
    },
    docToc() {
      let { headers } = this.$page
      if (headers) {
        let headersDepth1 = headers.filter(item => item.level === 2)
        return headersDepth1
      }
      return headers
    },
    tocActive() {
      return decodeURIComponent(this.$route.hash)
    },
  },
}
</script>

<style></style>

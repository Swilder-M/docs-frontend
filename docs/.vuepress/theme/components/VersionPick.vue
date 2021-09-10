<template>
  <div class="version-pick">
    <h2 class="title">{{ gitHubConfig.docName }}</h2>
    <div class="dropdown-wrapper">
      <button type="button" aria-label="Languages" class="dropdown-title">
        <span class="title">
          {{ currentVersion }}
        </span>
        <span class="arrow down"></span>
      </button>
      <ul class="version-dropdown" style="">
        <li v-for="(version, index) in versions" :key="index" class="dropdown-item">
          <a
            :href="`${versionLink}${version.value}/`"
            :class="{ 'version-link': true, active: version.label.indexOf(currentVersion) !== -1 }"
          >
            {{ version.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VersionPick',

  data() {
    return {
      versions: [],
    }
  },

  computed: {
    gitHubConfig() {
      const gitHubConfig =
        this.$lang === 'cn' ? this.$themeConfig.gitHubConfig.cn : this.$themeConfig.gitHubConfig.en
      return gitHubConfig
    },
    currentVersion() {
      return this.gitHubConfig.version
    },
    docsType() {
      const { docsType } = this.gitHubConfig
      return docsType
    },
    versionLink() {
      const { path } = this.$localeConfig
      return `${path}${this.docsType}/`
    },
  },

  methods: {
    async getVersions() {
      const currentDocType = this.$themeConfig.gitHubConfig[this.$lang].docsType
      const { status, data } = await this.$axios.get(
        `https://docs.emqx.io/api/${currentDocType}_versions`,
      )
      if (status === 200 && data) {
        this.versions = data
      }
    },
  },

  created() {
    this.getVersions()
  },
}
</script>

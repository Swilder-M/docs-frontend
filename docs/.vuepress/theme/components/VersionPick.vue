<template>
  <div class="version-pick">
    <router-link :to="`/${$lang}/${docsType}/latest`" class="home-link">
      <h2 class="title">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${docsType}`"></use>
        </svg>
        {{ gitHubConfig.docName }}
      </h2>
    </router-link>
    <div class="dropdown-wrapper">
      <button type="button" aria-label="Languages" class="dropdown-title">
        <span class="title">
          {{ currentVersion }}
        </span>
        <span class="arrow down"></span>
      </button>
      <ul v-if="versions.length" class="version-dropdown">
        <li v-for="(version, index) in versions" :key="index" class="dropdown-item">
          <a
            :href="`/${$lang}/${docsType}/${version.value}/`"
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
      const gitHubConfig = this.$lang === 'zh' ? this.$themeConfig.gitHubConfig.zh : this.$themeConfig.gitHubConfig.en
      return gitHubConfig
    },
    currentVersion() {
      return this.gitHubConfig.version
    },
    docsType() {
      return this.gitHubConfig.docsType
    },
  },

  methods: {
    async getVersions() {
      const docsType = this.$themeConfig.gitHubConfig[this.$lang].docsType
      const { status, data } = await this.$axios.get(`/api/${docsType}_versions.json`)
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

<template>
  <div class="version-pick">
    <router-link :to="`/${$lang}/${docsType}/${currentVersion}`" class="home-link">
      <h2 class="title p-0 is-flex is-align-items-center">
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
        <template v-for="(version, index) in versions">
          <li v-if="index < 10" :key="index" class="dropdown-item">
            <a
              :href="`/${$lang}/${docsType}/${version}/`"
              :class="{ 'version-link': true, active: version.indexOf(currentVersion) !== -1 }"
            >
              {{ version }}
            </a>
          </li>
        </template>
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

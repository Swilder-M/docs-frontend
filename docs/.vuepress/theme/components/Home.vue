<template>
  <main class="home-main column p-0">
    <section id="banner" class="has-text-centered">
      <div class="container">
        <h1 v-if="data.banner && data.banner.title" class="mt-0 mb-5">{{ data.banner.title }}</h1>
        <AlgoliaSearchBox :options="algolia" inputId="home-algolia-input" />
      </div>
    </section>
    <section v-if="data.products" id="products">
      <div class="container">
        <div class="columns is-multiline">
          <div v-for="(item, index) in data.products" :key="index" class="column is-6">
            <a :href="item.link">
              <div class="card p-6">
                <svg class="icon mb-5" aria-hidden="true" style="font-size: 48px">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                <h2 class="mt-0 mb-4 p-0">{{ item.title }}</h2>
                <p class="m-0">{{ item.details }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AlgoliaSearchBox from '@theme/components/AlgoliaSearchBox'

export default {
  name: 'Home',

  components: {
    AlgoliaSearchBox,
  },

  computed: {
    data() {
      return this.$page.frontmatter
    },

    algolia() {
      return {
        ...(this.$themeLocaleConfig.homeAlgolia || this.$site.themeConfig.homeAlgolia || {}),
        algoliaOptions: {
          hitsPerPage: 10,
          facetFilters: [`language:${this.$lang}`],
        },
        debug: process.env.NODE_ENV === 'development',
      }
    },
  },
}
</script>

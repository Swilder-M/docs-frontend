<template>
  <main class="home-main column p-0">
    <section id="banner" class="has-text-centered">
      <div class="container">
        <h1 v-if="data.banner && data.banner.title" class="m-0">{{ data.banner.title }}</h1>
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
export default {
  name: 'Home',

  computed: {
    data() {
      return this.$page.frontmatter
    },
  },
}
</script>

import axios from 'axios'
import pageComponents from '@internal/page-components'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.prototype.$axios = axios

  // fix unable to scroll to anchor
  if (typeof document === 'undefined') return
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const { hash } = location
      const decoded = decodeURIComponent(hash)
      if (hash !== decoded) {
        document.querySelector(decoded).scrollIntoView()
      }
    }
  }

  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }

  // add googleAnalytics
  const { id, dev } = siteData.themeConfig.googleAnalytics
  if ((dev || process.env.NODE_ENV === 'production') && id && typeof window !== 'undefined') {
    ;(function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r
      i[r] =
        i[r] ||
        function() {
          ;(i[r].q = i[r].q || []).push(arguments)
        }
      i[r].l = 1 * new Date()
      a = s.createElement(o)
      m = s.getElementsByTagName(o)[0]
      a.async = 1
      a.src = g
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

    ga('create', id, 'auto')
    ga('set', 'anonymizeIp', true)

    router.afterEach(function(to) {
      ga('set', 'page', router.app.$withBase(to.fullPath))
      ga('send', 'pageview')
    })
  }
}

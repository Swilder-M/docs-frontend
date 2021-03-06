const navConfig = require('./config/navConfig')
const footerConfig = require('./config/footerConfig')
const gitHubConfig = require('./config/githubConfig')
const directory = require('./config/directory.json')
const { containerBlock, containerInlineBlock } = require('./theme/util/containers')
const { removePlugin, PLUGINS } = require('@vuepress/markdown')
const fs = require('fs')
const { path } = require('@vuepress/shared-utils')
const axiosBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://community-test.emqx.cn/api/v1'
    : 'https://community-sites.emqx.com/api/v1'
const { docsType, docName, version } = gitHubConfig.en
const prefixEN = `/en/${docsType}/${version}/`
const prefixZH = `/zh/${docsType}/${version}/`
const docsHome = process.env.DOCS_HOME

module.exports = {
  host: 'localhost',
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/docs-images/favicon.ico' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
    ],
    ['meta', { property: 'og:site_name', content: 'docs.emqx.com' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://docs.emqx.com/' }],
    ['meta', { property: 'og:title', content: 'EMQ Docs' }],
    ['meta', { property: 'og:image', content: 'https://www.emqx.com/images/logo_512.png' }],
    ['script', { charset: 'utf-8', src: '//at.alicdn.com/t/font_2772539_53dg8y6kl8y.js' }],
  ],
  plugins: [
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
      },
    ],
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    '@vuepress/nprogress',
    'vuepress-plugin-element-tabs',
    'vuepress-plugin-smooth-scroll',
    [
      '@snowdog/vuepress-plugin-pdf-export',
      {
        outputFileName: `${docName} ${version}.pdf`,
        pageOptions: {
          margin: { top: 32, right: 48, bottom: 64, left: 48 },
          displayHeaderFooter: true,
          footerTemplate: `
              <div style="width: 100%; margin: 16px 48px; font-size: 9px; text-align: center;">
                <span>${docName} ${version}</span>
              </div>
          `,
        },
      },
    ],
    [
      'vuepress-plugin-code-copy',
      {
        color: '#866dff',
      },
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return new Date(timestamp).toLocaleDateString()
        },
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://docs.emqx.com',
        exclude: ['/404.html'],
        outFile: docsHome ? 'sitemap_home.xml' : `sitemap_${docsType}_${version}.xml`,
      },
    ],
    [
      'vuepress-plugin-serve',
      {
        staticOptions: {
          dotfiles: 'allow',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/en': 'TIP',
          '/zh': '??????',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'warning',
        defaultTitle: {
          '/en': 'WARING',
          '/zh': '??????',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'danger',
        defaultTitle: {
          '/en': 'DANGER',
          '/zh': '??????',
        },
      },
    ],
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        twitterCard: _ => 'summary',
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image &&
          (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http')) || '') + $page.frontmatter.image,
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, _context) => {
          add('twitter:site', '@EMQTech')
          add('twitter:creator', '@EMQTech')
          add('twitter:image', 'https://www.emqx.com/images/logo_512.png')
          add('twitter:image:alt', 'EMQ LOGO')
        },
      },
    ],
  ],
  themeConfig: {
    locales: {
      '/': {
        lang: 'en',
        // ??????????????????
        lastUpdated: 'last updated',
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: navConfig.en,
        sidebarDepth: 1,
        sidebar: {
          [prefixEN]: directory.en,
        },
      },
      '/zh': {
        lang: 'zh',
        // ??????????????????
        lastUpdated: '????????????',
        // ??????????????????????????????
        selectText: '????????????',
        // ????????????????????????????????????
        label: '??????',
        // ??????????????????
        editLinkText: '??? GitHub ???????????????',
        nav: navConfig.zh,
        sidebarDepth: 1,
        sidebar: {
          [prefixZH]: directory.cn,
        },
      },
    },
    domain: 'https://docs.emqx.com',
    // ???????????? true ???????????? false ???????????????????????? ????????? ??????
    nextLinks: true,
    // ???????????? true ???????????? false ???????????????????????? ????????? ??????
    preLinks: true,
    // ????????? logo
    logo: '/docs-images/logo.png',
    // ????????????
    smoothScroll: true,
    // GitHub??????
    gitHubConfig,
    axiosBaseUrl,
    // ????????????
    footerConfig,
    // Google Analytics
    googleAnalytics: {
      id: 'UA-145467055-1',
      // Type: Boolean
      // Turn on the development mode and disable the module.
      dev: true,
    },
    algolia: {
      appId: process.env.ALGOLIA_APPID || 'BQE6L1ZKBW',
      apiKey: process.env.ALGOLIA_APPKEY || '01a3aba56f903ae5cbfd52f50e62342c',
      indexName: process.env.ALGOLIA_INDEXNAME || 'emq_docs',
    },
  },
  postcss: [require('autoprefixer')],
  sass: { indentedSyntax: true },
  title: 'EMQ Documentation',
  locales: {
    '/': {
      lang: 'en',
      title: 'EMQ Documentation',
    },
    '/zh': {
      lang: 'zh',
      title: 'EMQ ??????',
    },
  },
  markdown: {
    lineNumbers: true,
    chainMarkdown(config) {
      removePlugin(config, PLUGINS.EMOJI)
    },
    extendMarkdown: md => {
      // ?????????Markdown it ??????,??????????????????
      md.use(function(md) {
        md.block.ruler.before('table', 'myplugin', containerBlock)
      })
      md.use(function(md) {
        md.inline.ruler2.before('balance_pairs', 'my_rule', containerInlineBlock)
      })
    },
  },
  configureWebpack: (config, isServer) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins[1].options = {
        filename: 'docs-assets/css/styles.[chunkhash:8].css',
        chunkFilename: 'docs-assets/css/[id].styles.[chunkhash:8].css',
      }
    }
  },
  chainWebpack: (webpackConfig, isServer) => {
    webpackConfig.when(process.env.NODE_ENV === 'production', config => {
      config.output.filename('docs-assets/js/[name].[chunkhash:8].js')
    })

    webpackConfig.resolve.alias.set('public', path.resolve(__dirname, './public'))
    webpackConfig.resolve.alias.set('assets', path.resolve(__dirname, './assets'))

    if (!isServer && process.env.BUILD_MODE === 'test') {
      webpackConfig
        .plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [{ analyzerPort: 7777 }])
        .init(Plugin => new Plugin())
    }

    webpackConfig.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'docs-assets/img/[name].[hash:8].[ext]',
      })

    webpackConfig.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'docs-assets/img/[name].[hash:8].[ext]' })

    webpackConfig.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'docs-assets/fonts/[name].[hash:8].[ext]',
      })

    webpackConfig.module
      .rule('compile')
      .test(/\.js$/)
      .include.add(/@vuepress/)
      .add(/.temp/)
      .add(/docs/)
      .add(/packages/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          [
            '@vue/babel-preset-app',
            {
              useBuiltIns: 'entry',
            },
          ],
        ],
      })
  },
}

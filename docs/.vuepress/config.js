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
    ['script', { charset: 'utf-8', src: '//at.alicdn.com/t/font_2772539_vulpmpuyh1.js' }],
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
      '@vuepress/google-analytics',
      {
        ga: 'UA-145467055-1',
      },
    ],
    [
      'fulltext-search',
      {
        // provide the contents of a JavaScript file
        hooks: fs.readFileSync(path.resolve(__dirname, './theme/util/searchHooks.js')),
      },
    ],
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
        outFile: `sitemap_${docsType}_${version}.xml`,
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
          '/zh': '提示',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'warning',
        defaultTitle: {
          '/en': 'WARING',
          '/zh': '注意',
        },
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'danger',
        defaultTitle: {
          '/en': 'DANGER',
          '/zh': '警告',
        },
      },
    ],
  ],
  themeConfig: {
    locales: {
      '/en/': {
        lang: 'en',
        // 文档更新时间
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
      '/': {
        lang: 'zh',
        // 文档更新时间
        lastUpdated: '更新时间',
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        nav: navConfig.zh,
        sidebarDepth: 1,
        sidebar: {
          [prefixZH]: directory.cn,
        },
      },
    },
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    preLinks: true,
    // 左上放 logo
    logo: '/docs-images/logo.png',
    // 页面滚动
    smoothScroll: true,
    // GitHub设置
    gitHubConfig,
    axiosBaseUrl,
    // 页脚设置
    footerConfig,
    // 搜索最大数量
    searchMaxSuggestions: 30,
  },
  postcss: [require('autoprefixer')],
  sass: { indentedSyntax: true },
  title: 'EMQ Docs',
  locales: {
    '/en/': {
      lang: 'en',
      title: 'EMQ Docs',
      description: 'EMQ Docs',
    },
    '/': {
      lang: 'zh',
      title: 'EMQ Docs',
      description: 'EMQ 使用文档',
    },
  },
  markdown: {
    lineNumbers: true,
    chainMarkdown(config) {
      removePlugin(config, PLUGINS.EMOJI)
    },
    extendMarkdown: md => {
      // 自定义Markdown it 插件,过滤渲染内容
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

    webpackConfig.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
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
        limit: 10000,
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

const docsType = process.env.DOCS_TYPE || 'emqx'
const docsBranch = process.env.DOCS_BRANCH || 'master'
const version = process.env.VERSION || 'latest'

const EMQXConfig = {
  cn: {
    docName: 'EMQ X 文档',
    docsRepo: 'emqx/emqx-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'EMQ X Docs',
    docsRepo: 'emqx/emqx-docs',
    docsDir: 'en_US',
  },
}

let currentConfig
switch (docsType) {
  case 'emqx':
    currentConfig = EMQXConfig
    break

  default:
    currentConfig = EMQXConfig
}

module.exports = {
  cn: {
    ...currentConfig.cn,
    docsType,
    docsBranch,
    version,
    editLinkText: '编辑此页',
    feedbackLinkText: '反馈文档问题',
  },
  en: {
    ...currentConfig.en,
    docsType,
    docsBranch,
    version,
    editLinkText: 'Edit this page',
    feedbackLinkText: 'Request docs changes',
  },
}

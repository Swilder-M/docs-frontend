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

const cloudConfig = {
  cn: {
    docName: 'Cloud 文档',
    docsRepo: 'emqx/cloud-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Cloud Docs',
    docsRepo: 'emqx/cloud-docs',
    docsDir: 'en_US',
  },
}

const fabricConfig = {
  cn: {
    docName: 'Fabric 文档',
    docsRepo: 'emqx/fabric-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Fabric Docs',
    docsRepo: 'emqx/fabric-docs',
    docsDir: 'en_US',
  },
}

const edgeConfig = {
  cn: {
    docName: 'Edge 文档',
    docsRepo: 'emqx/emqx-edge-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Edge Docs',
    docsRepo: 'emqx/emqx-edge-docs',
    docsDir: 'en_US',
  },
}

const kuiperConfig = {
  cn: {
    docName: 'eKuiper 文档',
    docsRepo: 'lf-edge/ekuiper',
    docsDir: 'docs/zh_CN',
  },
  en: {
    docName: 'eKuiper Docs',
    docsRepo: 'lf-edge/ekuiper',
    docsDir: 'docs/en_US',
  },
}

const neuronConfig = {
  cn: {
    docName: 'Neuron 文档',
    docsRepo: 'neugates/neuron-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Neuron Docs',
    docsRepo: 'neugates/neuron-docs',
    docsDir: 'en_US',
  },
}

let currentConfig
switch (docsType) {
  case 'emqx':
    currentConfig = EMQXConfig
    break
  case 'cloud':
    currentConfig = cloudConfig
    break
  case 'fabric':
    currentConfig = fabricConfig
    break
  case 'edge':
    currentConfig = edgeConfig
    break
  case 'kuiper':
    currentConfig = kuiperConfig
    break
  case 'neuron':
    currentConfig = neuronConfig
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

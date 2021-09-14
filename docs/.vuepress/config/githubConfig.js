const docsType = process.env.DOCS_TYPE || 'emqx'
const docsBranch = process.env.DOCS_BRANCH || 'master'
const version = process.env.VERSION || 'latest'

const EMQXConfig = {
  zh: {
    docName: 'EMQ X',
    docsRepo: 'emqx/emqx-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'EMQ X',
    docsRepo: 'emqx/emqx-docs',
    docsDir: 'en_US',
  },
}

const cloudConfig = {
  zh: {
    docName: 'Cloud',
    docsRepo: 'emqx/cloud-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Cloud',
    docsRepo: 'emqx/cloud-docs',
    docsDir: 'en_US',
  },
}

const fabricConfig = {
  zh: {
    docName: 'Fabric',
    docsRepo: 'emqx/fabric-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Fabric',
    docsRepo: 'emqx/fabric-docs',
    docsDir: 'en_US',
  },
}

const edgeConfig = {
  zh: {
    docName: 'Edge',
    docsRepo: 'emqx/emqx-edge-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Edge',
    docsRepo: 'emqx/emqx-edge-docs',
    docsDir: 'en_US',
  },
}

const kuiperConfig = {
  zh: {
    docName: 'eKuiper',
    docsRepo: 'lf-edge/ekuiper',
    docsDir: 'docs/zh_CN',
  },
  en: {
    docName: 'eKuiper',
    docsRepo: 'lf-edge/ekuiper',
    docsDir: 'docs/en_US',
  },
}

const neuronConfig = {
  zh: {
    docName: 'Neuron',
    docsRepo: 'neugates/neuron-docs',
    docsDir: 'zh_CN',
  },
  en: {
    docName: 'Neuron',
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
  zh: {
    ...currentConfig.zh,
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

const gitHubConfig = require('../../config/githubConfig.json')
const isEnterprise = gitHubConfig.cn.isEnterprise

const START_EMQX_CE = '{% emqxce %}'
const END_EMQX_CE = '{% endemqxce %}'
const START_EMQX_EE = '{% emqxee %}'
const END_EMQX_EE = '{% endemqxee %}'

let [hideStartKey, hideEndKey, showStartKey, showEndKey] = ['', '', '', '']

if (isEnterprise) {
  hideStartKey = START_EMQX_CE
  hideEndKey = END_EMQX_CE
  showStartKey = START_EMQX_EE
  showEndKey = END_EMQX_EE
} else {
  hideStartKey = START_EMQX_EE
  hideEndKey = END_EMQX_EE
  showStartKey = START_EMQX_CE
  showEndKey = END_EMQX_CE
}

function containerBlock(state, line, maxLine) {
  const re = /\x0a/g
  const start = state.bMarks[line] + state.tShift[line]
  const end = state.eMarks[line]
  // 获取当前行渲染内容
  const text = state.src.substring(start, end)

  // 匹配不需要显示的state, 则跳过包裹内容, 不进行递归渲染
  if (text === hideStartKey) {
    let laveText = state.src.substring(start)
    const blockStart = laveText.indexOf(hideStartKey)
    const blockEnd = laveText.indexOf(hideEndKey)
    breakArr = laveText.substring(blockStart, blockEnd).match(re)
    // 距离结束标签行数
    let count = breakArr ? breakArr.length + 1 : 1
    state.line += count
    return true
  }
  // 匹配需要显示的state, 仅跳过当前标志行
  if (text === showStartKey || text === showEndKey) {
    state.line += 1
    return true
  }
}

function containerInlineBlock(state, silent) {
  let hideStartIndex = state.src.indexOf(hideStartKey)
  let hideEndIndex = state.src.indexOf(hideEndKey)
  let showStartIndex = state.src.indexOf(showStartKey)
  let showEndIndex = state.src.indexOf(showEndKey)

  if (hideStartIndex !== -1 && hideEndIndex !== -1) {
    let tokens = state.tokens
    const max = tokens.length
    for (let curr = 0; curr < max; curr++) {
      if (tokens[curr].type === 'text') {
        hideStartIndex = tokens[curr].content.indexOf(hideStartKey)
        hideEndIndex = tokens[curr].content.indexOf(hideEndKey)
        const removeStr = tokens[curr].content.substring(
          hideStartIndex,
          hideEndIndex + hideEndKey.length,
        )
        tokens[curr].content = tokens[curr].content.replace(removeStr, '')
      }
    }
  }
  if (showStartIndex !== -1 && showEndIndex !== -1) {
    let tokens = state.tokens
    const max = tokens.length
    for (let curr = 0; curr < max; curr++) {
      if (tokens[curr].type === 'text') {
        tokens[curr].content = tokens[curr].content
          .replace(showStartKey, '')
          .replace(showEndKey, '')
      }
    }
  }
}

module.exports = {
  containerBlock,
  containerInlineBlock,
}

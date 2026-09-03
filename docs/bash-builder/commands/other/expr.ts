import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'expr',
  desc: '在命令行中计算表达式（算术/字符串）',
  category: 'other',
  arguments: [
    {
      name: 'expression',
      type: 'string',
      required: true,
      desc: '要计算的表达式，如 1 + 2'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD expr 支持基础算术与字符串比较运算，与 POSIX 规范一致；GNU expr 额外提供的 index/substr 等扩展函数在 BSD 版本上可能不受支持。',
      source: 'BSD'
    }
  }
}

export default data

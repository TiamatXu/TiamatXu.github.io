import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'bc',
  desc: '任意精度命令行计算器',
  category: 'other',
  arguments: [
    {
      name: 'expression',
      type: 'string',
      required: false,
      desc: '要计算的表达式'
    }
  ],
  options: [
    {
      flag: '-l',
      type: 'boolean',
      desc: '加载标准数学函数库（提供 sin/cos/sqrt 等）',
      long: '--mathlib'
    },
    {
      flag: '-q',
      type: 'boolean',
      desc: '静默模式，不显示欢迎信息',
      long: '--quiet'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-l'],
      note: 'macOS 自带的 bc 源自 OpenBSD 实现而非 GNU bc，默认精度（scale）等细节与部分内建函数存在差异，且不支持 GNU bc 的 -q 静默启动横幅选项。',
      source: 'BSD'
    }
  }
}

export default data

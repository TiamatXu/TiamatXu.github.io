import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'shuf',
  desc: '随机打乱输入的行顺序',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要打乱的文件路径'
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'string',
      desc: '只输出打乱后的前 N 行',
      long: '--head-count'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'shuf 是 GNU coreutils 专属命令，macOS 没有该命令；可用 macOS 自带 BSD sort 独有的 -R（随机排序）选项实现类似效果，如 sort -R file。'
    }
  }
}

export default data

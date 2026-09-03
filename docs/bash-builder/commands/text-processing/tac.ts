import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tac',
  desc: '反向输出文件内容（行倒序，与 cat 相反）',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要反向输出的文件路径'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'tac 是 GNU coreutils 专属命令，macOS 没有该命令；可用 macOS 自带 BSD tail 独有的 -r 选项（tail -r file）实现同样的整体行倒序效果，而这个 -r 选项在 GNU tail 上反而是不存在的。'
    }
  }
}

export default data

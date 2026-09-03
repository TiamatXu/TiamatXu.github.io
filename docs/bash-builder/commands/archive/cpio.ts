import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cpio',
  desc: '传统的 Unix 归档格式工具，常用于 initramfs 等场景',
  category: 'archive',
  options: [
    {
      flag: '-o',
      type: 'boolean',
      desc: '创建归档（从标准输入读取文件列表）',
      long: '--create'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '解包归档',
      long: '--extract'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示处理过程的详细信息',
      long: '--verbose'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'cpio 在 macOS（BSD cpio）与 Linux（GNU cpio）上均预装；两者对部分历史归档变体格式的兼容性存在细微差异，日常用法基本一致。',
      source: 'BSD'
    }
  }
}

export default data

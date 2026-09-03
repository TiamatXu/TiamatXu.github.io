import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ar',
  desc: '创建/提取 Unix 归档文件（.a 静态库、.deb 包内部格式等）',
  category: 'archive',
  arguments: [
    {
      name: 'archive',
      type: 'file',
      required: true,
      desc: '归档文件路径'
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '向归档中插入/替换文件',
      long: '--replace'
    },
    {
      flag: '-x',
      type: 'boolean',
      desc: '从归档中提取文件',
      long: '--extract'
    },
    {
      flag: '-t',
      type: 'boolean',
      desc: '列出归档内容',
      long: '--table'
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
      note: 'ar 在 macOS（BSD ar）与 Linux（GNU binutils ar）上均预装，常见于查看/构建 .a 静态库文件，基础用法一致。',
      source: 'BSD'
    }
  }
}

export default data

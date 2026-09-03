import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'diff',
  desc: '比较两个文件的差异',
  category: 'text-processing',
  arguments: [
    {
      name: 'file1',
      type: 'file',
      required: true,
      desc: '第一个文件'
    },
    {
      name: 'file2',
      type: 'file',
      required: true,
      desc: '第二个文件'
    }
  ],
  options: [
    {
      flag: '-u',
      type: 'boolean',
      desc: '以统一格式（unified diff）显示差异',
      long: '--unified'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '以上下文格式显示差异',
      long: '--context'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归比较目录',
      long: '--recursive'
    },
    {
      flag: '-q',
      type: 'boolean',
      desc: '只报告是否存在差异，不显示细节',
      long: '--brief'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '比较时忽略大小写',
      long: '--ignore-case'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data

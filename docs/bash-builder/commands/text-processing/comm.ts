import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'comm',
  desc: '逐行比较两个已排序文件，输出各自独有/共有的行',
  category: 'text-processing',
  arguments: [
    {
      name: 'file1',
      type: 'file',
      required: true,
      desc: '第一个已排序文件'
    },
    {
      name: 'file2',
      type: 'file',
      required: true,
      desc: '第二个已排序文件'
    }
  ],
  options: [
    {
      flag: '-1',
      type: 'boolean',
      desc: '不显示仅在 file1 中出现的行'
    },
    {
      flag: '-2',
      type: 'boolean',
      desc: '不显示仅在 file2 中出现的行'
    },
    {
      flag: '-3',
      type: 'boolean',
      desc: '不显示两个文件共有的行'
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

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cmp',
  desc: '逐字节比较两个文件，报告第一处差异位置',
  category: 'other',
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
      flag: '-s',
      type: 'boolean',
      desc: '静默模式，仅通过退出码表示是否相同',
      long: '--silent'
    },
    {
      flag: '-l',
      type: 'boolean',
      desc: '列出所有不同字节的位置，而非只显示第一处',
      long: '--verbose'
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

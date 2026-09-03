import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'chmod',
  desc: '修改文件或目录的权限',
  category: 'filesystem',
  arguments: [
    {
      name: 'mode',
      type: 'string',
      required: true,
      desc: '权限模式，如 755 或 u+x'
    },
    {
      name: 'file',
      type: 'path',
      required: true,
      desc: '目标文件或目录',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-R',
      type: 'boolean',
      desc: '递归修改目录下所有文件权限',
      long: '--recursive'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示每个文件的处理详情',
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

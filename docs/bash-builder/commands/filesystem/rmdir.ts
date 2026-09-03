import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'rmdir',
  desc: '删除空目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'directory',
      type: 'path',
      required: true,
      desc: '要删除的空目录路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'boolean',
      desc: '删除目录后一并删除路径中变为空的父目录',
      long: '--parents'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示每个正在处理目录的详细信息',
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

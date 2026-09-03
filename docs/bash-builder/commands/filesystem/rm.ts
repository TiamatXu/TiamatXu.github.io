import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'rm',
  desc: '删除文件或目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: true,
      desc: '要删除的文件或目录路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归删除目录及其内容',
      long: '--recursive'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '强制删除，忽略不存在的文件且不提示',
      long: '--force'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '删除前逐一确认',
      long: '--interactive'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示删除过程的详细信息',
      long: '--verbose'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '删除空目录（不递归）',
      long: '--dir'
    }
  ],
  rules: [
    {
      type: 'conflicts',
      flags: ['-f', '-i']
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-r', '-f', '-i', '-v', '-d'],
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'mv',
  desc: '移动或重命名文件/目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'source',
      type: 'path',
      required: true,
      desc: '源文件或目录',
      multiple: true
    },
    {
      name: 'dest',
      type: 'path',
      required: true,
      desc: '目标路径'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'boolean',
      desc: '强制覆盖，不提示确认',
      long: '--force'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '覆盖前进行提示确认',
      long: '--interactive'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示移动过程的详细信息',
      long: '--verbose'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '不覆盖已存在的目标文件',
      long: '--no-clobber'
    }
  ],
  rules: [
    {
      type: 'conflicts',
      flags: ['-f', '-i', '-n']
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

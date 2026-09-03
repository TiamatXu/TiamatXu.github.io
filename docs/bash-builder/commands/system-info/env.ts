import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'env',
  desc: '显示或临时修改环境变量后执行命令',
  category: 'system-info',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: false,
      desc: '要执行的命令'
    }
  ],
  options: [
    {
      flag: '-i',
      type: 'boolean',
      desc: '清空所有已继承的环境变量后再执行',
      long: '--ignore-environment'
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

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nice',
  desc: '以调整过的调度优先级启动新进程',
  category: 'process',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要执行的命令'
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'string',
      desc: '指定优先级调整值（-20 最高，19 最低）',
      long: '--adjustment'
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

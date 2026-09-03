import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'trap',
  desc: '为 shell 脚本注册信号/事件处理函数',
  category: 'other',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: false,
      desc: '捕获到信号时要执行的命令'
    },
    {
      name: 'signal',
      type: 'string',
      required: false,
      desc: '要捕获的信号，如 EXIT、INT、TERM',
      multiple: true
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'trap 是 shell 内建命令，两个平台上行为一致，常用于脚本退出时的清理逻辑（trap \'cleanup\' EXIT）。',
      source: 'BSD'
    }
  }
}

export default data

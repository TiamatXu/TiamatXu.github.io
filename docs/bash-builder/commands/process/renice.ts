import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'renice',
  desc: '调整正在运行进程的调度优先级',
  category: 'process',
  arguments: [
    {
      name: 'pid',
      type: 'number',
      required: true,
      desc: '目标进程 PID'
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'string',
      desc: '指定新的优先级值'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: '现代 macOS/BSD 的 renice 已同样支持 -n 指定优先级值，与 GNU renice 用法基本一致；早期 BSD 版本使用不带 -n 的位置参数写法（renice 优先级 pid），部分老资料中仍可见到。',
      source: 'BSD'
    }
  }
}

export default data

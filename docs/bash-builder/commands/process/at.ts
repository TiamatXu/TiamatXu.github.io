import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'at',
  desc: '安排命令在未来某个时间点执行一次',
  category: 'process',
  arguments: [
    {
      name: 'time',
      type: 'string',
      required: true,
      desc: '执行时间，如 now + 1 hour、或 10:00 pm'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'string',
      desc: '从文件读取要执行的命令'
    },
    {
      flag: '-l',
      type: 'boolean',
      desc: '列出所有待执行的任务（等价于 atq）',
      long: '--list'
    },
    {
      flag: '-r',
      type: 'string',
      desc: '删除指定的待执行任务（等价于 atrm）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 at 命令二进制，但其依赖的 atrun 守护进程默认处于关闭状态，需要手动执行 sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist 启用后任务才会被真正触发。',
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'crontab',
  desc: '管理用户的定时任务（cron）',
  category: 'process',
  options: [
    {
      flag: '-l',
      type: 'boolean',
      desc: '列出当前用户的定时任务',
      long: '--list'
    },
    {
      flag: '-e',
      type: 'boolean',
      desc: '编辑当前用户的定时任务',
      long: '--edit'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '删除当前用户的所有定时任务',
      long: '--remove'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'crontab 命令本身在 macOS 上依然存在，但从较新版本 macOS 开始，出于隐私保护（TCC）机制，cron 守护进程在无 “完全磁盘访问权限” 授权时可能无法正常触发任务；苹果也更推荐使用 launchd/launchctl 实现系统级定时任务。',
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'last',
  desc: '显示最近登录系统的用户历史记录',
  category: 'system-info',
  options: [
    {
      flag: '-n',
      type: 'string',
      desc: '限制显示的记录条数'
    },
    {
      flag: '-x',
      type: 'boolean',
      desc: '同时显示系统关机/重启事件'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'last 在 macOS 与 Linux 上均预装，基础用法一致；日志来源文件（wtmp）的位置与保留策略两边不同。',
      source: 'BSD'
    }
  }
}

export default data

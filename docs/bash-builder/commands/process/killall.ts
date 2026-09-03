import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'killall',
  desc: '按进程名称批量发送信号终止进程',
  category: 'process',
  arguments: [
    {
      name: 'name',
      type: 'string',
      required: true,
      desc: '进程名称',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-9',
      type: 'boolean',
      desc: '发送 SIGKILL 强制终止进程'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示已发送信号的进程详情',
      long: '--verbose'
    },
    {
      flag: '-w',
      type: 'boolean',
      desc: '等待被终止的进程真正退出后再返回',
      long: '--wait'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-9', '-v'],
      note: 'macOS 自带 BSD killall 按进程名终止的基础用法（如 killall Safari）与 Linux 版本类似，但没有 GNU killall（psmisc 提供）的 -w（等待进程退出）等扩展选项。',
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'netstat',
  desc: '显示网络连接、路由表、接口统计信息',
  category: 'network',
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有连接和监听端口',
      long: '--all'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '以数字形式显示地址和端口',
      long: '--numeric'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '显示路由表',
      long: '--route'
    },
    {
      flag: '-p',
      type: 'boolean',
      desc: '显示对应的进程名称及 PID（仅 Linux net-tools 支持）',
      long: '--program'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-a', '-n', '-r'],
      note: 'macOS 自带 BSD netstat 没有 GNU netstat 的 -p（显示占用端口的进程名/PID）选项，需要改用 lsof -i 或 nettop 查看进程与端口的对应关系。',
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'mongosh',
  desc: 'MongoDB 官方新一代命令行 Shell',
  category: 'database',
  options: [
    {
      flag: '--host',
      type: 'string',
      desc: '指定服务器主机地址'
    },
    {
      flag: '-u',
      type: 'string',
      desc: '指定登录用户名',
      long: '--username'
    },
    {
      flag: '--authenticationDatabase',
      type: 'string',
      desc: '指定用于身份验证的数据库'
    },
    {
      flag: '--eval',
      type: 'string',
      desc: '执行一段 JavaScript 代码后退出'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'mongosh 是取代旧版 mongo 命令的官方 Shell 工具，在 macOS 与 Linux 上均不预装，需要单独安装（brew install mongosh 或参照官方仓库 apt/yum 安装），安装后命令行用法完全一致。'
    }
  }
}

export default data

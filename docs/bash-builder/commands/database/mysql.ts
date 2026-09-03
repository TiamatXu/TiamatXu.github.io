import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'mysql',
  desc: 'MySQL/MariaDB 命令行客户端',
  category: 'database',
  options: [
    {
      flag: '-u',
      type: 'string',
      desc: '指定登录用户名',
      long: '--user'
    },
    {
      flag: '-p',
      type: 'boolean',
      desc: '提示输入密码（交互式）',
      long: '--password'
    },
    {
      flag: '-h',
      type: 'string',
      desc: '指定服务器主机地址',
      long: '--host'
    },
    {
      flag: '-D',
      type: 'string',
      desc: '指定要使用的数据库',
      long: '--database'
    },
    {
      flag: '-e',
      type: 'string',
      desc: '执行指定 SQL 语句后立即退出（非交互模式）',
      long: '--execute'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'mysql 客户端在 macOS 与 Linux 上均不预装，需要单独安装 MySQL/MariaDB（brew install mysql-client 或 apt/yum install mysql-client），安装后命令行用法完全一致。'
    }
  }
}

export default data

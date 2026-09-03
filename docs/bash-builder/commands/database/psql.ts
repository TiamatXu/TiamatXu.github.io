import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'psql',
  desc: 'PostgreSQL 命令行客户端',
  category: 'database',
  options: [
    {
      flag: '-U',
      type: 'string',
      desc: '指定登录用户名',
      long: '--username'
    },
    {
      flag: '-h',
      type: 'string',
      desc: '指定服务器主机地址',
      long: '--host'
    },
    {
      flag: '-d',
      type: 'string',
      desc: '指定要连接的数据库',
      long: '--dbname'
    },
    {
      flag: '-c',
      type: 'string',
      desc: '执行指定 SQL 命令后立即退出',
      long: '--command'
    },
    {
      flag: '-f',
      type: 'string',
      desc: '执行指定 SQL 脚本文件',
      long: '--file'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'psql 在 macOS 与 Linux 上均不预装，需要单独安装 PostgreSQL 客户端（brew install libpq 或 apt/yum install postgresql-client），安装后命令行用法完全一致。'
    }
  }
}

export default data

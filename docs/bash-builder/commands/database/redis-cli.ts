import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'redis-cli',
  desc: 'Redis 命令行客户端',
  category: 'database',
  options: [
    {
      flag: '-h',
      type: 'string',
      desc: '指定服务器主机地址',
      long: '--host'
    },
    {
      flag: '-p',
      type: 'string',
      desc: '指定服务器端口',
      long: '--port'
    },
    {
      flag: '-a',
      type: 'string',
      desc: '指定连接密码',
      long: '--auth'
    },
    {
      flag: '-n',
      type: 'string',
      desc: '选择要操作的数据库编号'
    },
    {
      flag: '--scan',
      type: 'boolean',
      desc: '以游标方式安全遍历 key（替代危险的 KEYS *）'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'redis-cli 随 Redis 一同分发，在 macOS 与 Linux 上均不预装，需要单独安装 Redis（brew install redis 或 apt/yum install redis），安装后命令行用法完全一致。'
    }
  }
}

export default data

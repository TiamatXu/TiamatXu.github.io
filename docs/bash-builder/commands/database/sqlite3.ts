import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sqlite3',
  desc: 'SQLite 命令行工具',
  category: 'database',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '数据库文件路径，省略则使用临时内存数据库'
    }
  ],
  options: [
    {
      flag: '-header',
      type: 'boolean',
      desc: '查询结果中显示列名'
    },
    {
      flag: '-csv',
      type: 'boolean',
      desc: '以 CSV 格式输出查询结果'
    },
    {
      flag: '-init',
      type: 'string',
      desc: '启动时先执行指定的 SQL 脚本文件'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'sqlite3 是少有的两边都默认预装的数据库客户端：macOS 与大多数 Linux 发行版的许多系统组件本身就依赖 SQLite，因此通常无需额外安装即可直接使用。',
      source: 'BSD'
    }
  }
}

export default data

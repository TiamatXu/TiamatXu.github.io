import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'zkCli.sh',
  desc: 'Apache ZooKeeper 自带的命令行客户端',
  category: 'middleware',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '交互命令，如 ls/create/get/set/delete/stat'
    },
    {
      name: 'path',
      type: 'string',
      required: true,
      desc: 'znode 路径，如 /myapp'
    },
    {
      name: 'data',
      type: 'string',
      required: false,
      desc: '节点数据内容，仅 create/set 需要'
    }
  ],
  options: [
    {
      flag: '-server',
      type: 'string',
      desc: '指定要连接的 ZooKeeper 服务地址，如 127.0.0.1:2181（习惯上写在最前面）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'ZooKeeper 是纯 Java 生态的中间件，zkCli.sh（Windows 下对应 zkCli.cmd）本身没有平台相关的行为差异，两个平台都不预装，需要先安装 JDK 再下载 ZooKeeper 发行包，脚本位于其 bin 目录下。',
      source: 'BSD'
    }
  }
}

export default data

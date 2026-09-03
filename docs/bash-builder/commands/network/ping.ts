import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ping',
  desc: '发送 ICMP 请求测试网络连通性',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: true,
      desc: '目标主机名或 IP'
    }
  ],
  options: [
    {
      flag: '-c',
      type: 'string',
      desc: '发送指定次数的请求包后停止'
    },
    {
      flag: '-i',
      type: 'string',
      desc: '指定请求包发送间隔（秒）'
    },
    {
      flag: '-w',
      type: 'string',
      desc: '设置总超时时间（秒）后退出',
      long: '--deadline'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-c', '-i'],
      note: 'macOS(BSD) ping 与 GNU ping 部分选项含义不同，例如总超时/存活时间相关参数的字母及语义不完全一致，跨平台脚本请以 man ping 为准，不要假设 -w 存在或含义相同。',
      source: 'BSD'
    }
  }
}

export default data

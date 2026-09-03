import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'od',
  desc: '以八进制/十六进制/字符等格式转储文件内容',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要查看的文件路径'
    }
  ],
  options: [
    {
      flag: '-A',
      type: 'string',
      desc: '指定地址偏移量的显示进制',
      long: '--address-radix'
    },
    {
      flag: '-t',
      type: 'string',
      desc: '指定输出格式，如 x1（单字节十六进制）',
      long: '--format'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '以 ASCII 字符（或转义序列）显示'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'od 是 POSIX 标准命令，在 macOS 与 Linux 上均预装，基础用法一致，是比 xxd 更保证跨平台可用的十六进制查看方式。',
      source: 'BSD'
    }
  }
}

export default data

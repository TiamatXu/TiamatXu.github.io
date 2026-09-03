import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'uname',
  desc: '显示系统内核与硬件信息',
  category: 'system-info',
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示全部信息',
      long: '--all'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '显示内核名称',
      long: '--kernel-name'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '显示内核发行版本',
      long: '--kernel-release'
    },
    {
      flag: '-m',
      type: 'boolean',
      desc: '显示硬件架构（如 x86_64/arm64）',
      long: '--machine'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '显示主机名',
      long: '--nodename'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'uname -s 在 macOS 上返回 “Darwin” 而不是 “Linux”，脚本中若用 uname -s 判断系统类型，需要额外处理 Darwin 分支；其余选项含义与 Linux 一致。',
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'arch',
  desc: '显示或以指定架构运行程序',
  category: 'system-info',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: false,
      desc: '在 macOS 上可指定要以特定架构运行的命令'
    }
  ],
  options: [
    {
      flag: '-x86_64',
      type: 'boolean',
      desc: '（macOS）以 x86_64 架构运行指定命令，常用于 Apple Silicon 上的 Rosetta 转译'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: [],
      note: 'macOS 的 arch 除了输出当前架构，还可用于 arch -x86_64 command 的形式强制以某一架构（如通过 Rosetta 转译）运行程序，这是 Linux 版 arch（等价于 uname -m）所不具备的额外用途。',
      source: 'BSD'
    }
  }
}

export default data

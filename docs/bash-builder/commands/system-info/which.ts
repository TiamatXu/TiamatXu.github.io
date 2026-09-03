import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'which',
  desc: '查找命令对应的可执行文件路径',
  category: 'system-info',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要查找的命令名'
    }
  ],
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '列出 PATH 中所有匹配的可执行文件',
      long: '--all'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: [],
      note: '经典坑点：macOS 自带的 which 是极简的 csh 衍生实现，不支持 -a 列出所有匹配项，且其内部路径缓存有时会返回过期结果；建议改用 shell 内建的 type -a 命令或 command -v 代替。',
      source: 'BSD'
    }
  }
}

export default data

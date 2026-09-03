import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'jq',
  desc: '命令行 JSON 处理与查询工具',
  category: 'other',
  arguments: [
    {
      name: 'filter',
      type: 'string',
      required: true,
      desc: 'jq 查询表达式，如 .name 或 .[] | .id'
    },
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要处理的 JSON 文件，省略则从标准输入读取'
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '输出原始字符串而非 JSON 字符串（去除引号）',
      long: '--raw-output'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '以紧凑格式输出（不美化换行缩进）',
      long: '--compact-output'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install jq',
      note: 'jq 在 macOS 与大多数 Linux 发行版上均不预装，需要分别通过 brew install jq 或 apt/yum install jq 安装，安装后语法完全一致。'
    }
  }
}

export default data

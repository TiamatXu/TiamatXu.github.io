import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'stat',
  desc: '显示文件或文件系统的详细状态信息',
  category: 'filesystem',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要查看的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'string',
      desc: '使用 BSD 风格格式串输出（如 -f "%N %z"）'
    },
    {
      flag: '-c',
      type: 'string',
      desc: '使用 GNU 风格格式串输出（如 -c "%n %s"）'
    },
    {
      flag: '-L',
      type: 'boolean',
      desc: '遇到符号链接时显示其指向目标的信息',
      long: '--dereference'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-f', '-L'],
      note: 'macOS 自带 BSD stat 使用 -f 指定格式串（占位符如 %N、%z），与 GNU stat 的 -c/--format（占位符如 %n、%s）完全不兼容，跨平台脚本需要分别适配。',
      source: 'BSD'
    }
  }
}

export default data

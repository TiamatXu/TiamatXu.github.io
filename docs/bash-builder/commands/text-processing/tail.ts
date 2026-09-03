import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tail',
  desc: '显示文件末尾内容',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要查看的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'string',
      desc: '显示的行数',
      long: '--lines'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '持续输出追加的新内容',
      long: '--follow'
    },
    {
      flag: '-c',
      type: 'string',
      desc: '显示的字节数',
      long: '--bytes'
    },
    {
      flag: '-F',
      type: 'boolean',
      desc: '跟踪文件（按文件名重试，适应日志轮转）',
      long: '--follow=name --retry'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-n', '-f', '-c'],
      note: 'macOS 自带 BSD tail 没有 GNU 的 -F（按文件名持续重试，用于日志轮转场景）选项，只有基础的 -f。',
      source: 'BSD'
    }
  }
}

export default data

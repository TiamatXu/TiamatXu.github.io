import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'touch',
  desc: '创建空文件或更新文件的时间戳',
  category: 'filesystem',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要创建或更新的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '仅更新访问时间'
    },
    {
      flag: '-m',
      type: 'boolean',
      desc: '仅更新修改时间'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '文件不存在时不创建',
      long: '--no-create'
    },
    {
      flag: '-d',
      type: 'string',
      desc: '使用自然语言字符串指定时间',
      long: '--date'
    },
    {
      flag: '-t',
      type: 'string',
      desc: '使用 [[CC]YY]MMDDhhmm[.ss] 格式指定时间'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-a', '-m', '-c', '-t'],
      note: 'macOS 自带 BSD touch 不支持 GNU 的 -d（自然语言日期字符串）选项，如需类似效果请使用 -t 指定固定格式时间，或通过 brew install coreutils 安装 GNU 版本。',
      source: 'BSD'
    }
  }
}

export default data

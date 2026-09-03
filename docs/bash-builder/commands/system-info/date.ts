import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'date',
  desc: '显示或设置系统日期时间',
  category: 'system-info',
  arguments: [
    {
      name: 'format',
      type: 'string',
      required: false,
      desc: '以 + 开头的输出格式，如 +%Y-%m-%d'
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'string',
      desc: '按自然语言/字符串解析出指定日期（GNU 专属）',
      long: '--date'
    },
    {
      flag: '-u',
      type: 'boolean',
      desc: '以 UTC 时间显示',
      long: '--utc'
    },
    {
      flag: '-R',
      type: 'boolean',
      desc: '以 RFC 2822 格式显示',
      long: '--rfc-2822'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-u', '-R'],
      note: '另一经典跨平台坑：GNU date 用 -d "1 day ago" 这类自然语言字符串计算日期，macOS 自带 BSD date 不支持 -d，而是用 -v 做相对调整（如 date -v-1d）、用 -j -f 解析自定义格式的输入字符串，写法完全不同，脚本需要按平台分别处理或改用 gdate（brew install coreutils）。',
      source: 'BSD'
    }
  }
}

export default data

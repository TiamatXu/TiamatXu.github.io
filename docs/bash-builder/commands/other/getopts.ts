import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'getopts',
  desc: '在 shell 脚本中解析短选项形式的命令行参数',
  category: 'other',
  arguments: [
    {
      name: 'optstring',
      type: 'string',
      required: true,
      desc: '选项字符集合，如 ab:c（b 后需要参数）'
    },
    {
      name: 'variable',
      type: 'string',
      required: true,
      desc: '保存当前解析到的选项的变量名'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'getopts 是 POSIX shell 内建命令，两个平台上行为一致；注意它与独立的外部命令 getopt 是两回事——GNU getopt 额外支持长选项（--option）解析，而 macOS 自带的 BSD getopt 功能非常有限，不支持长选项，这也是很多脚本在 macOS 上解析 --xxx 长参数失败的常见原因。',
      source: 'BSD'
    }
  }
}

export default data

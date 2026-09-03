import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'mktemp',
  desc: '安全地创建临时文件或目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'template',
      type: 'string',
      required: false,
      desc: '文件名模板，需包含一串 X，如 /tmp/tmp.XXXXXX'
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'boolean',
      desc: '创建临时目录而非文件',
      long: '--directory'
    },
    {
      flag: '-p',
      type: 'string',
      desc: '指定临时文件存放的目录（GNU 专属）',
      long: '--tmpdir'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-d'],
      note: 'macOS 自带 BSD mktemp 不支持 GNU 的 -p（指定存放目录）等长选项，且必须显式提供包含 XXXXXX 的模板参数，否则报错；GNU mktemp 在省略模板时会使用默认模板。',
      source: 'BSD'
    }
  }
}

export default data

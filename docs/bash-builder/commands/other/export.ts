import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'export',
  desc: '将 shell 变量导出为环境变量',
  category: 'other',
  arguments: [
    {
      name: 'name=value',
      type: 'string',
      required: false,
      desc: '变量定义，如 PATH=$PATH:/usr/local/bin'
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'boolean',
      desc: '取消变量的导出属性（不删除变量本身）'
    },
    {
      flag: '-p',
      type: 'boolean',
      desc: '列出当前已导出的所有环境变量'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data

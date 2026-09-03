import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'head',
  desc: '显示文件开头内容',
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
      flag: '-c',
      type: 'string',
      desc: '显示的字节数',
      long: '--bytes'
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

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cat',
  desc: '连接文件并输出到标准输出',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要输出的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'boolean',
      desc: '为所有输出行编号',
      long: '--number'
    },
    {
      flag: '-b',
      type: 'boolean',
      desc: '仅为非空行编号',
      long: '--number-nonblank'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '将连续多个空行压缩为一行',
      long: '--squeeze-blank'
    },
    {
      flag: '-A',
      type: 'boolean',
      desc: '显示所有不可见字符（等价于 -vet）',
      long: '--show-all'
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

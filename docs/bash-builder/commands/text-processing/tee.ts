import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tee',
  desc: '将标准输入同时写入文件和标准输出',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要写入的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '追加到文件末尾而非覆盖',
      long: '--append'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '忽略中断信号',
      long: '--ignore-interrupts'
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

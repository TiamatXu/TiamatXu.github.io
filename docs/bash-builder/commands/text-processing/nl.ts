import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nl',
  desc: '为文本行添加行号',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要处理的文件路径'
    }
  ],
  options: [
    {
      flag: '-b',
      type: 'enum',
      desc: '指定编号方式（a 全部编号 / t 仅非空行）',
      choices: ['a', 't']
    },
    {
      flag: '-s',
      type: 'string',
      desc: '指定行号与内容之间的分隔符',
      long: '--number-separator'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'nl 的基础编号功能在 macOS 与 Linux 上一致，部分编号样式代码（-n 的取值等）存在细微差异。',
      source: 'BSD'
    }
  }
}

export default data

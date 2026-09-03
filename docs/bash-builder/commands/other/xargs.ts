import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'xargs',
  desc: '将标准输入的内容转换为命令行参数并执行命令',
  category: 'other',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: false,
      desc: '要执行的命令，省略则默认为 echo'
    }
  ],
  options: [
    {
      flag: '-I',
      type: 'string',
      desc: '指定替换占位符并逐项执行'
    },
    {
      flag: '-n',
      type: 'string',
      desc: '每次调用命令时最多使用的参数个数',
      long: '--max-args'
    },
    {
      flag: '-P',
      type: 'string',
      desc: '并行执行的最大进程数',
      long: '--max-procs'
    },
    {
      flag: '-0',
      type: 'boolean',
      desc: '以 NUL 字符作为输入项的分隔符（配合 find -print0）'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '输入为空时不执行命令',
      long: '--no-run-if-empty'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-I', '-n', '-P', '-0'],
      note: 'macOS 自带 BSD xargs 没有 GNU 的 -r（输入为空时不运行命令，避免命令至少执行一次的默认行为）选项；-I/-n/-P/-0 等常用选项两者均支持。',
      source: 'BSD'
    }
  }
}

export default data

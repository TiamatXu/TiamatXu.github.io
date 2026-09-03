import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'xxd',
  desc: '以十六进制格式显示或还原文件内容',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要查看的文件路径'
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '将十六进制格式还原为二进制内容',
      long: '--revert'
    },
    {
      flag: '-l',
      type: 'string',
      desc: '限制读取的字节数',
      long: '--len'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'xxd 并非系统核心工具，而是随 vim 一同分发；由于 macOS 与主流 Linux 发行版通常都预装 vim，因此 xxd 在两边一般都可用。若环境没有 vim，可改用两边都原生自带的 hexdump -C 或 od -A x -t x1z 作为更可靠的替代。',
      source: 'BSD'
    }
  }
}

export default data

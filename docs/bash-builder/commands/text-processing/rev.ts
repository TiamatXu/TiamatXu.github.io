import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'rev',
  desc: '将每一行内的字符顺序反转',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要处理的文件路径'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'rev 在 macOS（BSD）与 Linux（util-linux）上均预装，用法一致，都是按字符反转每一行（而非像 tac 那样反转行的顺序）。',
      source: 'BSD'
    }
  }
}

export default data

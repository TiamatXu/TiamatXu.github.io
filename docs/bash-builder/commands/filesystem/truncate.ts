import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'truncate',
  desc: '将文件截断或扩展为指定大小',
  category: 'filesystem',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '目标文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-s',
      type: 'string',
      desc: '指定目标大小（如 10M、+1K、0）',
      long: '--size'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD truncate 与 GNU truncate 的 -s 用法基本一致，均支持绝对大小与 +/- 相对增减写法。',
      source: 'BSD'
    }
  }
}

export default data

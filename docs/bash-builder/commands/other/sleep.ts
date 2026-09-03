import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sleep',
  desc: '暂停执行指定的时间',
  category: 'other',
  arguments: [
    {
      name: 'duration',
      type: 'string',
      required: true,
      desc: '暂停的时长（秒）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD sleep 只接受整数秒，不支持 GNU sleep 的小数秒（如 sleep 0.5）以及 s/m/h/d 时间单位后缀（如 sleep 2m），跨平台脚本需要注意只传纯整数。',
      source: 'BSD'
    }
  }
}

export default data

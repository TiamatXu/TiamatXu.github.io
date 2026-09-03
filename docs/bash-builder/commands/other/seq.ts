import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'seq',
  desc: '生成一个数字序列',
  category: 'other',
  arguments: [
    {
      name: 'first',
      type: 'number',
      required: false,
      desc: '起始数字'
    },
    {
      name: 'last',
      type: 'number',
      required: true,
      desc: '结束数字'
    }
  ],
  options: [
    {
      flag: '-s',
      type: 'string',
      desc: '指定数字之间的分隔符',
      long: '--separator'
    },
    {
      flag: '-w',
      type: 'boolean',
      desc: '输出等宽数字（前导补零）',
      long: '--equal-width'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD seq 支持基础的起止范围与 -s/-w 等常用选项，用法与 GNU seq 基本一致，个别格式化长选项名称可能不同。',
      source: 'BSD'
    }
  }
}

export default data

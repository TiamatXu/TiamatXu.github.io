import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'base64',
  desc: '对数据进行 Base64 编码/解码',
  category: 'other',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要编码/解码的文件，省略则从标准输入读取'
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'boolean',
      desc: '解码',
      long: '--decode'
    },
    {
      flag: '-w',
      type: 'string',
      desc: '指定每行输出的换行宽度（0 表示不换行）',
      long: '--wrap'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-d'],
      note: 'macOS 自带 BSD base64 没有 GNU 的 -w（换行宽度）选项，改用 -b 控制换行字节数，且默认换行行为也与 GNU 版本不同，跨平台脚本处理长文本编码时需要留意输出格式差异。',
      source: 'BSD'
    }
  }
}

export default data

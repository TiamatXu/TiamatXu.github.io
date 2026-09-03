import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'iconv',
  desc: '在不同字符编码之间转换文本',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要转换的文件路径'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'string',
      desc: '指定源编码，如 GBK',
      long: '--from-code'
    },
    {
      flag: '-t',
      type: 'string',
      desc: '指定目标编码，如 UTF-8',
      long: '--to-code'
    },
    {
      flag: '-o',
      type: 'string',
      desc: '指定输出文件',
      long: '--output'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'iconv 在 macOS 与 Linux 上均预装且命令行用法一致；macOS 底层基于 BSD/ICU 实现，Linux 上多基于 glibc iconv，两者支持的具体编码别名列表存在细微差异。',
      source: 'BSD'
    }
  }
}

export default data

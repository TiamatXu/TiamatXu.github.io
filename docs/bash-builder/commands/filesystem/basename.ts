import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'basename',
  desc: '从路径中提取文件名部分',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: true,
      desc: '文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-s',
      type: 'string',
      desc: '去除指定的文件名后缀',
      long: '--suffix'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '一次处理多个路径参数',
      long: '--multiple'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-s'],
      note: 'macOS 自带 BSD basename 不支持 GNU 的 -a（一次处理多个路径参数）选项，多路径场景需要循环调用或改用 GNU coreutils 版本。',
      source: 'BSD'
    }
  }
}

export default data

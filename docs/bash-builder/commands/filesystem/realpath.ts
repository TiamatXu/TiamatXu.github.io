import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'realpath',
  desc: '输出文件的规范化绝对路径',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: true,
      desc: '要解析的路径'
    }
  ],
  options: [
    {
      flag: '-q',
      type: 'boolean',
      desc: '静默模式，隐藏错误信息',
      long: '--quiet'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带的 realpath 为 BSD 版本，可用选项比 GNU 版本少（不支持 --relative-to 等），日常解析绝对路径的基础用法两者一致。',
      source: 'BSD'
    }
  }
}

export default data

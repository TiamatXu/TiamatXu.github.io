import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'less',
  desc: '分页查看文件内容',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要查看的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-N',
      type: 'boolean',
      desc: '显示行号'
    },
    {
      flag: '-S',
      type: 'boolean',
      desc: '长行不自动换行（截断显示）'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '搜索时忽略大小写'
    },
    {
      flag: '-R',
      type: 'boolean',
      desc: '正确显示原始控制字符（如颜色）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带的 less 版本通常较旧，常用选项行为与 GNU/新版 less 基本一致；如需最新特性可 brew install less。',
      source: 'BSD'
    }
  }
}

export default data

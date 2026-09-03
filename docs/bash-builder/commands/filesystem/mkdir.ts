import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'mkdir',
  desc: '创建目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'directory',
      type: 'path',
      required: true,
      desc: '要创建的目录路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'boolean',
      desc: '递归创建父目录，目录已存在时不报错',
      long: '--parents'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示已创建目录的详细信息',
      long: '--verbose'
    },
    {
      flag: '-m',
      type: 'string',
      desc: '设置新目录的权限模式'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD mkdir 与 GNU mkdir 常用选项一致，无明显差异。',
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'file',
  desc: '识别文件类型',
  category: 'filesystem',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要识别的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-b',
      type: 'boolean',
      desc: '简洁输出，不显示文件名',
      long: '--brief'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '以 MIME 类型形式输出',
      long: '--mime-type'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD file 与 Linux 上的 file（libmagic）同源，基础用法一致；但两边内置的魔术数字（magic）数据库版本不同，对个别小众格式的判断结果可能有差异。',
      source: 'BSD'
    }
  }
}

export default data

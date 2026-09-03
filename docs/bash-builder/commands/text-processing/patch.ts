import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'patch',
  desc: '将 diff 生成的补丁文件应用到源文件',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要打补丁的目标文件（可省略，从补丁文件头推断）'
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'string',
      desc: '忽略补丁文件路径中的指定层级目录前缀',
      long: '--strip'
    },
    {
      flag: '-i',
      type: 'string',
      desc: '指定要应用的补丁文件',
      long: '--input'
    },
    {
      flag: '-R',
      type: 'boolean',
      desc: '反向应用补丁（即撤销该补丁）',
      long: '--reverse'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'patch 在 macOS（BSD patch）与 Linux（GNU patch）上均预装，基础用法一致；对模糊匹配、二进制文件等边缘情况的处理细节略有差异。',
      source: 'BSD'
    }
  }
}

export default data

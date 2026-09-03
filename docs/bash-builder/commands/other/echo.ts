import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'echo',
  desc: '输出一行文本',
  category: 'other',
  arguments: [
    {
      name: 'text',
      type: 'string',
      required: false,
      desc: '要输出的文本内容',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'boolean',
      desc: '不输出末尾的换行符'
    },
    {
      flag: '-e',
      type: 'boolean',
      desc: '启用反斜杠转义序列（如 \\n、\\t）的解释'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'echo 常用作 shell 内建命令，-n/-e 在 bash/zsh 内建实现中于两个平台上行为一致；macOS 出于 GPLv3 许可原因默认自带的是较旧的 bash 3.2，若脚本依赖更新的 bash 特性（与 echo 无直接关系但常一并踩坑），建议 brew install bash。',
      source: 'BSD'
    }
  }
}

export default data

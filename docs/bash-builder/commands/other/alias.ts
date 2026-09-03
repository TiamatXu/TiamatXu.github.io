import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'alias',
  desc: '为命令创建别名',
  category: 'other',
  arguments: [
    {
      name: 'name=value',
      type: 'string',
      required: false,
      desc: '别名定义，如 ll=\'ls -al\''
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'boolean',
      desc: '打印当前已定义的所有别名'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'alias 是 shell 内建命令，bash/zsh 上语法一致。',
      source: 'BSD'
    }
  }
}

export default data

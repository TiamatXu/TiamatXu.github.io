import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'printenv',
  desc: '打印环境变量的值',
  category: 'system-info',
  arguments: [
    {
      name: 'name',
      type: 'string',
      required: false,
      desc: '环境变量名称，省略则打印全部'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'chown',
  desc: '修改文件或目录的所有者/所属组',
  category: 'filesystem',
  arguments: [
    {
      name: 'owner',
      type: 'string',
      required: true,
      desc: '用户名或 用户名:组名'
    },
    {
      name: 'file',
      type: 'path',
      required: true,
      desc: '目标文件或目录',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-R',
      type: 'boolean',
      desc: '递归修改目录下所有文件的所有者',
      long: '--recursive'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示每个文件的处理详情',
      long: '--verbose'
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

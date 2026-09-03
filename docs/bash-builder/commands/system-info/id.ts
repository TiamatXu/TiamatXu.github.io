import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'id',
  desc: '显示用户与用户组的 UID/GID 信息',
  category: 'system-info',
  arguments: [
    {
      name: 'user',
      type: 'string',
      required: false,
      desc: '要查询的用户名，省略则查询当前用户'
    }
  ],
  options: [
    {
      flag: '-u',
      type: 'boolean',
      desc: '仅显示用户 UID',
      long: '--user'
    },
    {
      flag: '-g',
      type: 'boolean',
      desc: '仅显示用户主组 GID',
      long: '--group'
    },
    {
      flag: '-G',
      type: 'boolean',
      desc: '显示用户所属的所有组 GID',
      long: '--groups'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '配合 -u/-g/-G 以名称而非数字显示',
      long: '--name'
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

import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'umask',
  desc: '查看或设置新建文件/目录的默认权限掩码',
  category: 'filesystem',
  arguments: [
    {
      name: 'mode',
      type: 'string',
      required: false,
      desc: '要设置的掩码值，如 022，省略则显示当前值'
    }
  ],
  options: [
    {
      flag: '-S',
      type: 'boolean',
      desc: '以符号形式（如 u=rwx,g=rx,o=rx）显示',
      long: '--symbolic'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'umask 是 shell 内建命令，bash/zsh 上行为一致，两个平台默认掩码值通常都是 022。',
      source: 'BSD'
    }
  }
}

export default data

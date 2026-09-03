import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ssh-keygen',
  desc: '生成、管理和转换 SSH 认证密钥',
  category: 'other',
  options: [
    {
      flag: '-t',
      type: 'enum',
      desc: '指定密钥类型，如 rsa/ed25519',
      long: '--type',
      choices: ['rsa', 'ed25519', 'ecdsa', 'dsa']
    },
    {
      flag: '-b',
      type: 'string',
      desc: '指定密钥长度（位）',
      long: '--bits'
    },
    {
      flag: '-f',
      type: 'string',
      desc: '指定输出的密钥文件路径',
      long: '--file'
    },
    {
      flag: '-C',
      type: 'string',
      desc: '为密钥添加注释（通常为邮箱）',
      long: '--comment'
    },
    {
      flag: '-N',
      type: 'string',
      desc: '指定私钥密码短语',
      long: '--new-passphrase'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 OpenSSH 提供的 ssh-keygen，常用选项与 Linux 一致；系统自带 OpenSSH 版本可能落后于最新发行版，个别新增密钥类型或参数在旧版本上可能不受支持，可通过 brew install openssh 更新。',
      source: 'BSD'
    }
  }
}

export default data

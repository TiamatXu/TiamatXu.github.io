import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ssh',
  desc: '安全远程登录与命令执行',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: true,
      desc: '登录目标，格式为 [user@]host'
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'string',
      desc: '指定端口号'
    },
    {
      flag: '-i',
      type: 'string',
      desc: '指定私钥文件',
      long: '--identity_file'
    },
    {
      flag: '-L',
      type: 'string',
      desc: '本地端口转发'
    },
    {
      flag: '-R',
      type: 'string',
      desc: '远程端口转发'
    },
    {
      flag: '-N',
      type: 'boolean',
      desc: '不执行远程命令，仅建立转发'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '输出调试信息（可叠加 -vv/-vvv）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 OpenSSH 客户端，参数与 Linux 上的 OpenSSH 完全一致；系统版本可能略旧，个别新特性需自行安装较新的 OpenSSH。',
      source: 'BSD'
    }
  }
}

export default data

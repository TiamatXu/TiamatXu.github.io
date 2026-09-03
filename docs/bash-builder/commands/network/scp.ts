import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'scp',
  desc: '基于 SSH 的安全文件复制',
  category: 'network',
  arguments: [
    {
      name: 'source',
      type: 'string',
      required: true,
      desc: '源路径，可为 [user@]host:path 或本地路径'
    },
    {
      name: 'dest',
      type: 'string',
      required: true,
      desc: '目标路径，可为 [user@]host:path 或本地路径'
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归复制目录',
      long: '--recursive'
    },
    {
      flag: '-P',
      type: 'string',
      desc: '指定端口号（大写，与 ssh 的 -p 不同）'
    },
    {
      flag: '-i',
      type: 'string',
      desc: '指定私钥文件'
    },
    {
      flag: '-p',
      type: 'boolean',
      desc: '保留文件的修改时间和权限'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 OpenSSH 的 scp，用法与 Linux 一致；较新版 OpenSSH 默认改用 SFTP 协议传输，个别老旧兼容参数（如 -O 强制使用旧协议）在系统自带版本上可能没有。',
      source: 'BSD'
    }
  }
}

export default data

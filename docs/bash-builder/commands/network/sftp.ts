import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sftp',
  desc: '基于 SSH 的交互式安全文件传输',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: true,
      desc: '目标主机，格式为 [user@]host'
    }
  ],
  options: [
    {
      flag: '-P',
      type: 'string',
      desc: '指定端口号'
    },
    {
      flag: '-i',
      type: 'string',
      desc: '指定私钥文件'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归传输目录（配合 get/put 使用）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'sftp 随 macOS 自带的 OpenSSH 一同提供，用法与 Linux 上的版本完全一致。',
      source: 'BSD'
    }
  }
}

export default data

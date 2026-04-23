# Claude Code 安装配置

#AI #Coding #Tooling

环境：`WSL2 (Ubuntu) + Node.js ≥18 + zsh`

官方文档：[Claude Code Docs](https://code.claude.com/docs/zh-CN/overview)

**Claude Code** 是 Anthropic 官方提供的命令行工具，可直接在终端中进行代码分析和生成。
本文介绍如何在 WSL2 环境下安装 Claude Code，并使用 **CC Switch** 统一管理主流模型 API。  
**bash**：将 zsh 相关部分替换为 bash 即可。（.zshrc 替换为 .bashrc）

## 环境准备（Node.js ≥18）

```bash
# 安装 Node.js LTS
$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
$ sudo apt-get install -y nodejs

# 验证
$ node -v  # ≥18
$ npm -v
```

## 安装 Claude Code （二选一）

```bash
# 官方一键脚本（官方推荐）
$ curl -fsSL https://claude.ai/install.sh | bash

# 或 npm 全局安装（个人推荐）
$ npm install -g @anthropic-ai/claude-code
```

## 配置 PATH 环境变量（解决 command not found）

```bash
# 如果使用官方脚本，通常会自动添加 PATH；如果手动安装，需添加 ~/.local/bin
$ echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.zshrc
# 如果使用 npm 全局安装，可直接添加 node_modules 全局路径
$ echo 'export PATH="$PATH:/path_to_nodejs/v18.xx.x/bin"' >> ~/.zshrc

# 生效配置、验证安装
$ source ~/.zshrc
$ claude --version
```

## 首次登录与配置

理论上这时候已经可以直接使用 `claude` 命令了，但首次运行需要登录认证（需订阅账户） & 魔法，推荐使用 CC Switch 配置：

```bash
$ claude
# 按提示打开浏览器完成授权，或手动配置 API Key
```

## Ext: CC Switch 安装

使用 CC Switch 可以方便地在多个模型（如 Claude 2、Claude Instant 100k、Gemini Pro 等）之间切换，统一管理 API Key 和请求参数。  
CC Switch 需要 GUI 界面支持，所以这里我将其安装到 Windows11 宿主机上，配置好路径一样能正常使用。

安装包下载：[CC Switch Releases](https://github.com/farion1231/cc-switch/releases)  
进入后选择最新版本，下载 `CC-Switch-vx.xx.x-Windows.msi` 后根据指引安装即可。

**修改 claude 配置文件路径：**

1. 点击左上角齿轮图标进入设置。
2. 选择高级设置，展开配置文件目录。
3. 将 Claude Code 配置目录路径修改为 WSL 虚拟机中的实际路径（通常是 `\\wsl.localhost\Ubuntu-xx.xx\home\[username]\.claude`）。

<img alt="claude 配置" src="https://site-bucket.tiamatxu.dpdns.org/2026/04/Snipaste_2026-04-23_16-23-09.png" title="修改 claude 配置文件路径"/>

**添加模型：**

进入 CC Switch 后，选择 Claude 配置，点击右上角黄色的 + 号，选择对应的模型提供商（如 Zhipu GLM），输入从提供商获取到的 API Key 和其他参数后保存即可。


## 常见问题

1. **权限错误**：安装时若提示 `EACCES`，请使用 `sudo npm install -g` 或修改 npm 默认目录。
2. **网络超时**：WSL2 无法连接宿主机代理时，请检查 Windows 防火墙是否允许 WSL 访问代理端口。

# 全局配置 `Zsh & Oh My Zsh`

#Linux #Ubuntu  
环境：`Ubuntu`   
其他环境使用对应命令即可      
原文链接：[Linux 全局安装配置 zsh + oh-my-zsh](https://sysin.org/blog/linux-zsh-all/)，本文按照个人使用习惯稍作更改。

## root 密码配置

```bash
sudo passwd
passwd [选项] [用户名]
```

`passwd`更改用户的密码。以普通用户身份执行时，可更改当前用户的密码；以`root`用户身份执行，后面跟上用户名，可以更改指定用户的密码。

- `-l`：锁定指定用户的密码，使其无法登录。
- `-u`：解锁指定用户的密码。
- `-d`：删除指定用户的密码，使用户可以无密码登录。
- `-e`：强制用户下次登录时更改密码。

## 安装 zsh 并为所有用户配置

- 查看当前 shell

```bash
echo $SHELL
```

- 查看已安装 shell

```bash
cat /etc/shells
```

- 安装 zsh

```bash
sudo apt install zsh
```

- 设置默认 shell

```bash
# 下次登录生效
sudo chsh -s /bin/zsh # root
sudo chsh -s /bin/zsh <username> # 特定用户
```

- 安装或更新 git

```bash
# 从软件源服务器获取最新的软件包列表信息，可用的软件包版本情况
sudo apt update
# 已安装则更新到系统默认源里的最新版本；未安装则安装。
sudo apt install git
```

## 全局配置 Oh My Zsh

- 切换 root

```bash 
su # 切换 root，pwd 不变  
su - # 同时切换 pwd 到用户主目录
sudo -i # 同上
```

- 安装 Oh My Zsh
  将 Oh My Zsh 克隆到 `/etc/oh-my-zsh` 目录，以供所有用户使用

```bash
git clone --depth=1 https://github.com/ohmyzsh/ohmyzsh.git /etc/oh-my-zsh
```

- 创建默认的 `.zshrc` 文件
  新用户首次登录时，系统会从 `/etc/skel` 目录中复制默认配置文件到其主目录。

```bash
cp /etc/oh-my-zsh/templates/zshrc.zsh-template /etc/skel/.zshrc
```

- 修改 `.zshrc`

```bash
# ZSH 环境变量指向全局安装目录
sed -i 's|export ZSH=$HOME/.oh-my-zsh|export ZSH=/etc/oh-my-zsh|g' /etc/skel/.zshrc
# 配置独立的缓存目录，避免权限问题
sed -i '/^export ZSH=/a export ZSH_CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/oh-my-zsh"' /etc/skel/.zshrc
# 修改默认主题（示例为 ys）
sed -i '/^ZSH_THEME=.*/c ZSH_THEME="ys"' /etc/skel/.zshrc
# 禁用自动更新，改为手动更新
sed -i 's|# zstyle ':omz:update' mode disabled|zstyle ':omz:update' mode disabled|g' /etc/skel/.zshrc
```

## 全局插件配置

将插件克隆到全局插件目录 `/etc/oh-my-zsh/custom/plugins/`，然后在 `/etc/skel/.zshrc` 中启用。

- **zsh-syntax-highlighting**：命令语法高亮

```bash
git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting.git /etc/oh-my-zsh/custom/plugins/zsh-syntax-highlighting
# 在 .zshrc 中启用插件
sed -i '/^plugins=.*/c plugins=(git zsh-syntax-highlighting)' /etc/skel/.zshrc
```

- **zsh-autosuggestions**：命令历史建议

```bash
git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions.git /etc/oh-my-zsh/custom/plugins/zsh-autosuggestions
# 在 .zshrc 中启用插件，注意不要覆盖之前的配置
sed -i '/^plugins=.*/c plugins=(git zsh-syntax-highlighting zsh-autosuggestions)' /etc/skel/.zshrc
```

- **zsh-completions**：增强的命令补全

```bash
git clone --depth=1 https://github.com/zsh-users/zsh-completions /etc/oh-my-zsh/custom/plugins/zsh-completions
# 编辑 /etc/skel/.zshrc，在 `source $ZSH/oh-my-zsh.sh` 之前添加以下内容
# fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
# 然后在 plugins=(...) 中添加 zsh-completions
sed -i '/^plugins=.*/c plugins=(git zsh-syntax-highlighting zsh-autosuggestions zsh-completions)' /etc/skel/.zshrc
```

- **incr**：增量式自动补全

```bash
mkdir /etc/oh-my-zsh/custom/plugins/incr
curl -fsSL https://mimosa-pudica.net/src/incr-0.2.zsh -o /etc/oh-my-zsh/custom/plugins/incr/incr.zsh
# 在 /etc/skel/.zshrc 文件末尾追加
echo "source /etc/oh-my-zsh/custom/plugins/incr/incr.zsh" >> /etc/skel/.zshrc
```

## 用户配置

### 新用户

编辑 `/etc/default/useradd` 文件，将 `SHELL=/bin/sh` 修改为 `SHELL=/bin/zsh`。这样新创建的用户将自动使用 Zsh 和全局配置。

### 已有用户

对于已存在的用户，需要手动配置。

- 复制全局配置文件到用户主目录

```bash
# <username> 需要替换为实际的用户名
cp /etc/skel/.zshrc /home/<username>/.zshrc
# 别忘了修改文件所有者
chown <username>:<username> /home/<username>/.zshrc
```

- 设置默认 shell

```bash
sudo chsh -s /bin/zsh <username>
```

之后，用户重新登录即可生效。

export type ArgumentType = 'path' | 'file' | 'pattern' | 'string' | 'number';
export type OptionType = 'boolean' | 'string' | 'enum';

export interface CommandArgument {
  name: string;
  type: ArgumentType;
  required?: boolean;
  multiple?: boolean;
  default?: any;
  desc: string;
}

export interface CommandOption {
  flag: string;
  long?: string;
  type: OptionType;
  desc: string;
  choices?: string[]; // 仅用于 enum 类型
  requires?: string[]; // 依赖的其他 flag
  conflicts?: string[]; // 冲突的其他 flag
}

export interface CommandRule {
  type: 'conflicts' | 'requires' | 'exclusiveGroup';
  flags: string[];
}

// 命令 / 子命令在某个系统（发行版或平台）下的支持情况
export interface CommandVariant {
  supported?: boolean; // 该系统是否默认自带此命令（无需额外安装），省略视为 true
  availableOptions?: string[]; // 该系统下可用的选项 flag 列表，省略视为与顶层 options 一致
  install?: string; // 若默认不自带，可通过该命令安装
  note?: string; // 差异说明，例如行为不同、需要替代命令等
  source?: string; // 命令来源，例如 "GNU Coreutils" / "BSD"
}

// 子命令，例如 apt install / systemctl start，拥有独立的参数与选项
export interface CommandSubcommand {
  name: string;
  desc: string;
  arguments?: CommandArgument[];
  options?: CommandOption[];
  rules?: CommandRule[];
  variants?: Record<string, CommandVariant>; // 该子命令在不同系统下的支持情况（可能与顶层命令不同）
}

export interface CommandData {
  name: string;
  desc: string;
  category: string;
  arguments?: CommandArgument[];
  options?: CommandOption[];
  rules?: CommandRule[];
  subcommands?: CommandSubcommand[]; // 拥有子命令体系的工具（如 apt、systemctl）
  source?: string; // 默认来源
  // 各系统 / 平台下的支持情况，键名约定：ubuntu、centos、bsd（代表 macOS 及其他 BSD 系）等
  variants?: Record<string, CommandVariant>;
}

// 解析后的命令状态
export interface ParsedCommand {
  command?: CommandData;
  subcommand?: CommandSubcommand; // 命中的子命令（若命令拥有 subcommands 体系）
  tokens: string[]; // 原始 token 列表
  activeCommandName?: string;
  selectedOptions: CommandOption[];
  positionalArgs: string[];
  currentFragment: string; // 当前正在输入的片段（用于联想）
  isOptionFragment: boolean; // 当前片段是否以 '-' 开头
}

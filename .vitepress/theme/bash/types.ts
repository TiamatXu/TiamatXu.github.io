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

// 命令变体，现在主要用于标记来源或安装方式
export interface CommandVariant {
  source?: string; // 命令来源，例如 "GNU Coreutils"
  install?: string; // 安装命令
}

export interface CommandData {
  name: string;
  desc: string;
  category: string;
  arguments?: CommandArgument[];
  options?: CommandOption[];
  rules?: CommandRule[];
  source?: string; // 默认来源
  variants?: Record<string, CommandVariant>; // 保留以兼容旧数据或记录不同发行版差异
}

// 解析后的命令状态
export interface ParsedCommand {
  command?: CommandData;
  tokens: string[]; // 原始 token 列表
  activeCommandName?: string;
  selectedOptions: CommandOption[];
  positionalArgs: string[];
  currentFragment: string; // 当前正在输入的片段（用于联想）
  isOptionFragment: boolean; // 当前片段是否以 '-' 开头
}

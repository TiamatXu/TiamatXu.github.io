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
  macos?: boolean; // 该选项在 macOS 自带（BSD）版本命令中是否可用，省略默认视为可用
}

export interface CommandRule {
  type: 'conflicts' | 'requires' | 'exclusiveGroup';
  flags: string[];
}

// 命令变体，现在主要用于标记来源或安装方式
export interface CommandVariant {
  source?: string; // 命令来源，例如 "GNU Coreutils"
  install?: string; // 安装命令
  availableOptions?: string[]; // 该发行版/平台下可用的选项 flag 列表
}

export interface CommandData {
  name: string;
  desc: string;
  category: string;
  macos: boolean; // 命令本身在 macOS 上是否默认可用（无需额外安装即可在终端使用）
  macosNote?: string; // macOS 兼容性补充说明，例如行为差异、替代命令或安装方式
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

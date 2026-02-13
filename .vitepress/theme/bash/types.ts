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

export interface CommandVariant {
  availableOptions: string[];
  install?: string;
}

export interface CommandData {
  name: string;
  desc: string;
  category: string;
  arguments?: CommandArgument[];
  options?: CommandOption[];
  rules?: CommandRule[];
  variants?: Record<string, CommandVariant>;
}

export interface CommandState {
  command: string; // 命令名称
  system: string;  // 如 'ubuntu' | 'centos'
  options: Set<string>; // 选中的 flag 集合
  args: Record<string, any>; // 位置参数的值
}

import type { CommandData, CommandOption, ParsedCommand } from './types';

/**
 * 将输入框字符串解析为结构化数据
 */
export function parseCommand(input: string, allCommands: CommandData[]): ParsedCommand {
  const tokens = input.trimStart().split(/\s+/);
  const commandName = tokens[0] || '';
  const command = allCommands.find(c => c.name === commandName);
  const selectedOptions: CommandOption[] = [];
  const positionalArgs: string[] = [];

  // 获取当前正在输入的片段（用于联想）
  const lastChar = input.slice(-1);
  const currentFragment = lastChar === ' ' ? '' : (tokens[tokens.length - 1] || '');
  const isOptionFragment = currentFragment.startsWith('-');

  if (command) {
    // 遍历除命令名外的 tokens，识别已选选项和位置参数
    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i];
      if (!token) continue;
      
      // 如果不是正在输入的最后一个片段，或者后面有空格，则视为已完成输入的 token
      if (i < tokens.length - 1 || lastChar === ' ') {
        const option = command.options?.find(o => o.flag === token || o.long === token);
        if (option) {
          selectedOptions.push(option);
        } else if (!token.startsWith('-')) {
          positionalArgs.push(token);
        }
      }
    }
  }

  return {
    command,
    tokens,
    activeCommandName: commandName,
    selectedOptions,
    positionalArgs,
    currentFragment,
    isOptionFragment
  };
}

/**
 * 获取命令名的匹配项
 */
export function matchCommandNames(query: string, allCommands: CommandData[]): CommandData[] {
  if (!query) return [];
  const q = query.toLowerCase();
  return allCommands.filter(c => 
    c.name.toLowerCase().startsWith(q) || c.desc.toLowerCase().includes(q)
  );
}

/**
 * 获取参数/选项的匹配项
 */
export function matchOptions(command: CommandData, query: string, alreadySelected: CommandOption[]): CommandOption[] {
  const availableOptions = command.options || [];
  const q = query.toLowerCase();
  
  return availableOptions.filter(opt => {
    // 排除已选中的
    if (alreadySelected.some(s => s.flag === opt.flag)) return false;
    
    // 匹配 flag 或 long 名称或说明
    return (
      opt.flag.toLowerCase().includes(q) || 
      (opt.long && opt.long.toLowerCase().includes(q)) ||
      opt.desc.toLowerCase().includes(q)
    );
  });
}

/**
 * 动态生成当前输入内容的语义解释
 */
export function generateExplanation(parsed: ParsedCommand): string {
  if (!parsed.command) {
    return parsed.activeCommandName ? `未匹配到命令 "${parsed.activeCommandName}"` : '输入以开始构建命令...';
  }

  let explanation = `使用 ${parsed.command.name} (${parsed.command.desc})`;

  if (parsed.selectedOptions.length > 0) {
    const opts = parsed.selectedOptions.map(o => o.desc).join('、');
    explanation += `，启用了 ${opts}`;
  }

  if (parsed.positionalArgs.length > 0) {
    explanation += `，目标为 ${parsed.positionalArgs.join(', ')}`;
  }

  return explanation;
}

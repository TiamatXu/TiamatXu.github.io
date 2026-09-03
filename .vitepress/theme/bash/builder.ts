import type { CommandData, CommandOption, CommandSubcommand, ParsedCommand } from './types';

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

  let subcommand: CommandSubcommand | undefined;
  let optionSource: CommandOption[] | undefined;
  let startIndex = 1;

  if (command) {
    const hasSubcommands = !!command.subcommands && command.subcommands.length > 0;

    if (hasSubcommands) {
      // 拥有子命令体系（如 apt install、systemctl start）：第 2 个 token 是子命令名。
      // 部分工具（如 dpkg -i、rpm -qa、pacman -S）的"子命令"本身就是带短横线的 flag 形式，
      // 因此这里按名称精确匹配，不因为以 '-' 开头就排除。
      const subToken = tokens[1];
      if (subToken) {
        subcommand = command.subcommands!.find(s => s.name === subToken);
      }
      startIndex = 2;
      optionSource = subcommand?.options;
    } else {
      optionSource = command.options;
    }

    // 子命令体系下，子命令尚未被识别匹配时，无法判断后续 token 的语义，不再继续解析
    const canParseRest = !hasSubcommands || !!subcommand;

    if (canParseRest) {
      for (let i = startIndex; i < tokens.length; i++) {
        const token = tokens[i];
        if (!token) continue;

        // 如果不是正在输入的最后一个片段，或者后面有空格，则视为已完成输入的 token
        if (i < tokens.length - 1 || lastChar === ' ') {
          const option = optionSource?.find(o => o.flag === token || o.long === token);
          if (option) {
            selectedOptions.push(option);
          } else if (!token.startsWith('-')) {
            positionalArgs.push(token);
          }
        }
      }
    }
  }

  return {
    command,
    subcommand,
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
 * 获取子命令名的匹配项（如 apt 的 install / remove / update）
 */
export function matchSubcommandNames(query: string, subcommands: CommandSubcommand[]): CommandSubcommand[] {
  const q = query.toLowerCase();
  if (!q) return subcommands;
  return subcommands.filter(s =>
    s.name.toLowerCase().startsWith(q) || s.desc.toLowerCase().includes(q)
  );
}

/**
 * 获取参数/选项的匹配项
 */
export function matchOptions(options: CommandOption[], query: string, alreadySelected: CommandOption[]): CommandOption[] {
  const q = query.toLowerCase();

  return options.filter(opt => {
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

const SYSTEM_LABELS: Record<string, string> = {
  ubuntu: 'Ubuntu',
  centos: 'CentOS',
  bsd: 'macOS (BSD)'
};

/**
 * 动态生成当前输入内容的语义解释，包含子命令与跨系统（尤其是 macOS/BSD）兼容性提示
 */
export function generateExplanation(parsed: ParsedCommand): string {
  if (!parsed.command) {
    return parsed.activeCommandName ? `未匹配到命令 "${parsed.activeCommandName}"` : '输入以开始构建命令...';
  }

  const command = parsed.command;
  let explanation = `使用 ${command.name} (${command.desc})`;

  if (command.subcommands && command.subcommands.length > 0) {
    if (parsed.subcommand) {
      explanation += `，子命令 ${parsed.subcommand.name}（${parsed.subcommand.desc}）`;
    } else {
      const names = command.subcommands.map(s => s.name).join(' / ');
      explanation += `，该命令需先指定子命令，可选：${names}`;
    }
  }

  if (parsed.selectedOptions.length > 0) {
    const opts = parsed.selectedOptions.map(o => o.desc).join('、');
    explanation += `，启用了 ${opts}`;
  }

  if (parsed.positionalArgs.length > 0) {
    explanation += `，目标为 ${parsed.positionalArgs.join(', ')}`;
  }

  // 汇总当前命令/子命令的系统支持情况，重点提示 macOS(BSD)
  const variants = parsed.subcommand?.variants ?? command.variants;
  if (variants) {
    const warnings: string[] = [];
    for (const [sysKey, variant] of Object.entries(variants)) {
      const label = SYSTEM_LABELS[sysKey] || sysKey;
      if (variant.supported === false) {
        warnings.push(`${label} 默认不支持该命令${variant.note ? `（${variant.note}）` : ''}`);
        continue;
      }
      const unsupported = variant.availableOptions
        ? parsed.selectedOptions.filter(o => !variant.availableOptions!.includes(o.flag))
        : [];
      if (unsupported.length > 0) {
        warnings.push(`${unsupported.map(o => o.flag).join('/')} 在 ${label} 下不受支持${variant.note ? `（${variant.note}）` : ''}`);
      } else if (variant.note) {
        // 选项本身在该系统上存在，但行为可能不同（如 sed -i 是否需要参数）：
        // 当已选选项的 flag 被该系统的说明文字提及时，同样给出提示
        const behaviorDiffers = parsed.selectedOptions.some(o => variant.note!.includes(o.flag));
        if (behaviorDiffers) {
          warnings.push(`${label}：${variant.note}`);
        }
      }
    }
    if (warnings.length > 0) {
      explanation += `。⚠ ${warnings.join('；')}`;
    }
  }

  return explanation;
}

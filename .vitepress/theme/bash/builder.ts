import type { CommandData, CommandState, CommandOption } from './types';

/**
 * 构建最终的命令字符串
 */
export function buildCommand(data: CommandData, state: CommandState): string {
  const parts: string[] = [data.name];

  // 1. 处理选项 (Options)
  // 根据当前系统过滤可用选项
  const availableOptions = data.variants?.[state.system]?.availableOptions || 
                          data.options?.map(o => o.flag) || [];
  
  const availableOptionMap = new Map<string, CommandOption>();
  data.options?.forEach(opt => {
    if (availableOptions.includes(opt.flag)) {
      availableOptionMap.set(opt.flag, opt);
    }
  });

  // 排序以保证输出稳定性
  const sortedSelectedFlags = Array.from(state.options).sort();

  for (const flag of sortedSelectedFlags) {
    const opt = availableOptionMap.get(flag);
    if (!opt) continue;

    // 检查规则：如果依赖项未选中，则忽略该选项（或在 UI 层处理）
    if (opt.requires && !opt.requires.every(r => state.options.has(r))) {
      continue;
    }

    // 检查规则：如果存在冲突项，则忽略（简单处理，优先保留先出现的）
    if (opt.conflicts && opt.conflicts.some(c => state.options.has(c))) {
      // 在实际 UI 中应该禁止选中冲突项，这里做兜底
      continue;
    }

    parts.push(flag);

    // 如果是带值的选项
    if (opt.type !== 'boolean' && state.args[flag]) {
      parts.push(state.args[flag]);
    }
  }

  // 2. 处理位置参数 (Arguments)
  if (data.arguments) {
    for (const arg of data.arguments) {
      const value = state.args[arg.name];
      if (value !== undefined && value !== '') {
        parts.push(value);
      } else if (arg.default !== undefined) {
        parts.push(arg.default);
      }
    }
  }

  return parts.join(' ');
}

/**
 * 规则验证器：判断某个选项是否由于规则限制而变为不可选
 */
export function getOptionStatus(
  flag: string,
  data: CommandData,
  state: CommandState
): { disabled: boolean; reason?: string } {
  const opt = data.options?.find(o => o.flag === flag);
  if (!opt) return { disabled: true };

  // 1. 检查发行版可用性
  const availableOptions = data.variants?.[state.system]?.availableOptions;
  if (availableOptions && !availableOptions.includes(flag)) {
    return { disabled: true, reason: `该参数在 ${state.system} 系统中不可用` };
  }

  // 2. 检查依赖项 (Requires)
  if (opt.requires) {
    const missing = opt.requires.filter(r => !state.options.has(r));
    if (missing.length > 0) {
      return { disabled: true, reason: `需要先启用: ${missing.join(', ')}` };
    }
  }

  // 3. 检查冲突项 (Conflicts)
  if (opt.conflicts) {
    const conflicting = opt.conflicts.filter(c => state.options.has(c));
    if (conflicting.length > 0) {
      return { disabled: true, reason: `与以下参数冲突: ${conflicting.join(', ')}` };
    }
  }

  // 4. 检查互斥组 (Exclusive Groups)
  if (data.rules) {
    for (const rule of data.rules) {
      if (rule.type === 'exclusiveGroup' && rule.flags.includes(flag)) {
        const othersInGroup = rule.flags.filter(f => f !== flag && state.options.has(f));
        if (othersInGroup.length > 0) {
          return { disabled: true, reason: `与互斥参数冲突: ${othersInGroup.join(', ')}` };
        }
      }
      if (rule.type === 'conflicts' && rule.flags.includes(flag)) {
        const othersSelected = rule.flags.filter(f => f !== flag && state.options.has(f));
        if (othersSelected.length > 0) {
             return { disabled: true, reason: `冲突参数: ${othersSelected.join(', ')}` };
        }
      }
    }
  }

  return { disabled: false };
}

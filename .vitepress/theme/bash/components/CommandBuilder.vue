<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from 'vue'
import type { CommandData, CommandState } from '../types'
import { buildCommand, getOptionStatus } from '../builder'
import OptionToggle from './OptionToggle.vue'
import CommandPreview from './CommandPreview.vue'

const props = defineProps<{
  data: CommandData
}>()

const state = reactive<CommandState>({
  command: props.data.name,
  system: 'ubuntu',
  options: new Set<string>(),
  args: {}
})

// 初始化位置参数默认值
props.data.arguments?.forEach(arg => {
  if (arg.default !== undefined) {
    state.args[arg.name] = arg.default
  }
})

const currentCommand = computed(() => buildCommand(props.data, state))

function toggleOption(flag: string) {
  if (state.options.has(flag)) {
    state.options.delete(flag)
    // 递归检查：如果有其他选中的选项依赖于这个被取消的选项，也一并取消？
    // 或者简单处理：让 builder 逻辑在构建时过滤。这里为了 UX 保持简单。
  } else {
    const status = getOptionStatus(flag, props.data, state)
    if (!status.disabled) {
      state.options.add(flag)
    } else if (status.reason?.includes('需要先启用')) {
      // 自动补全逻辑
      const opt = props.data.options?.find(o => o.flag === flag)
      if (opt?.requires) {
        opt.requires.forEach(r => state.options.add(r))
        state.options.add(flag)
      }
    }
  }
}

function setSystem(sys: string) {
  state.system = sys
  // 切换系统时，清除当前系统中不可用的选项
  const available = props.data.variants?.[sys]?.availableOptions
  if (available) {
    for (const flag of state.options) {
      if (!available.includes(flag)) {
        state.options.delete(flag)
      }
    }
  }
}
</script>

<template>
  <div class="command-builder">
    <div class="builder-section">
      <h3>1. 选择系统环境</h3>
      <div class="system-selector">
        <button 
          v-for="sys in ['ubuntu', 'centos']" 
          :key="sys"
          :class="{ active: state.system === sys }"
          @click="setSystem(sys)"
        >
          {{ sys.charAt(0).toUpperCase() + sys.slice(1) }}
        </button>
      </div>
    </div>

    <div class="builder-section" v-if="data.options?.length">
      <h3>2. 配置参数 (Options)</h3>
      <div class="options-grid">
        <OptionToggle
          v-for="opt in data.options"
          :key="opt.flag"
          :option="opt"
          :selected="state.options.has(opt.flag)"
          :disabled="getOptionStatus(opt.flag, data, state).disabled"
          :reason="getOptionStatus(opt.flag, data, state).reason"
          @toggle="toggleOption(opt.flag)"
        />
      </div>
    </div>

    <div class="builder-section" v-if="data.arguments?.length">
      <h3>3. 位置参数 (Arguments)</h3>
      <div class="args-list">
        <div v-for="arg in data.arguments" :key="arg.name" class="arg-item">
          <label :for="arg.name">{{ arg.name }} ({{ arg.desc }})</label>
          <input 
            :id="arg.name"
            v-model="state.args[arg.name]"
            :placeholder="arg.default || ''"
            type="text"
          />
        </div>
      </div>
    </div>

    <CommandPreview :command="currentCommand" />
    
    <div class="install-hint" v-if="data.variants?.[state.system]?.install">
      <strong>安装参考:</strong> <code>{{ data.variants[state.system].install }}</code>
    </div>
  </div>
</template>

<style scoped>
.command-builder {
  margin: 24px 0;
  padding: 24px;
  background-color: var(--vt-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vt-c-divider);
}

.builder-section {
  margin-bottom: 32px;
}

.builder-section h3 {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--vt-c-text-1);
}

.system-selector {
  display: flex;
  gap: 12px;
}

.system-selector button {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid var(--vt-c-divider);
  background-color: var(--vt-c-bg);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.system-selector button.active {
  background-color: var(--vt-c-brand);
  color: white;
  border-color: var(--vt-c-brand);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.args-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.arg-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arg-item label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-2);
}

.arg-item input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vt-c-divider);
  background-color: var(--vt-c-bg);
  color: var(--vt-c-text-1);
  font-size: 14px;
}

.arg-item input:focus {
  outline: none;
  border-color: var(--vt-c-brand);
}

.install-hint {
  margin-top: 16px;
  font-size: 13px;
  color: var(--vt-c-text-2);
}

.install-hint code {
  color: var(--vt-c-brand-dark);
}
</style>

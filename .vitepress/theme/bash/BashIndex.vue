<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { data as bashGroups } from './bash.data'
import type { CommandData, CommandOption } from './types'
import { buildCommand, getOptionStatus } from './builder'

// 全局变量：系统选择
const system = ref<'ubuntu' | 'centos'>('ubuntu')
const query = ref('')
const searchInput = ref<HTMLInputElement>()

// 存储每个命令选中的参数，格式: { 'ls': Set(['-l', '-a']), 'grep': Set(['-i']) }
const selections = reactive<Record<string, Set<string>>>({})

onMounted(() => {
  searchInput.value?.focus()
})

const allCommands = computed(() => bashGroups.flatMap(g => g.commands))

const filteredResults = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return allCommands.value.filter(cmd =>
    cmd.name.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q)
  )
})

function toggleOption(cmd: CommandData, flag: string) {
  if (!selections[cmd.name]) {
    selections[cmd.name] = new Set()
  }

  const set = selections[cmd.name]
  if (set.has(flag)) {
    set.delete(flag)
  } else {
    // 简单的规则验证逻辑（复用之前的 builder 逻辑）
    const state = {
      command: cmd.name,
      system: system.value,
      options: set,
      args: {}
    }
    const status = getOptionStatus(flag, cmd, state)
    if (!status.disabled) {
      set.add(flag)
    }
  }
}

function getGeneratedCommand(cmd: CommandData) {
  const set = selections[cmd.name] || new Set()
  const state = {
    command: cmd.name,
    system: system.value,
    options: set,
    args: {} // 极简版暂不处理复杂位置参数
  }
  return buildCommand(cmd, state)
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  // 这里可以加一个简单的反馈效果
}

const systems = [
  { id: 'ubuntu', label: 'Ubuntu / Debian', icon: '🟠' },
  { id: 'centos', label: 'CentOS / RHEL', icon: '🔵' }
]
</script>

<template>
  <div class="bash-explorer">
    <!-- 顶部控制栏：系统选择 -->
    <div class="top-controls">
      <div class="system-toggle">
        <button
          v-for="s in systems"
          :key="s.id"
          :class="{ active: system === s.id }"
          @click="system = s.id as any"
        >
          <span class="icon">{{ s.icon }}</span>
          <span class="label">{{ s.label }}</span>
        </button>
      </div>
    </div>

    <!-- 核心搜索框 -->
    <div class="search-section">
      <div class="search-input-wrapper">
        <span class="prefix">$</span>
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="搜索命令... (例如: ls, tar, find)"
          spellcheck="false"
          autocomplete="off"
        />
        <div class="search-hint" v-if="!query">输入以匹配命令及参数</div>
      </div>
    </div>

    <!-- 结果列表：二级下拉展示 -->
    <div class="results-container" v-if="query">
      <div v-for="cmd in filteredResults" :key="cmd.name" class="cmd-item">
        <div class="cmd-header">
          <div class="title-row">
            <span class="name">{{ cmd.name }}</span>
            <span class="desc">{{ cmd.desc }}</span>
          </div>
          <div class="preview-row" @click="copyToClipboard(getGeneratedCommand(cmd))" title="点击复制">
            <code>{{ getGeneratedCommand(cmd) }}</code>
            <span class="copy-hint">📋 复制</span>
          </div>
        </div>

        <!-- 二级参数展示区 -->
        <div class="options-drawer" v-if="cmd.options?.length">
          <div class="drawer-title">可用参数 ({{ system }})</div>
          <div class="options-tags">
            <button
              v-for="opt in cmd.options.filter(o => !cmd.variants?.[system]?.availableOptions || cmd.variants[system].availableOptions.includes(o.flag))"
              :key="opt.flag"
              class="option-tag"
              :class="{
                selected: selections[cmd.name]?.has(opt.flag),
                disabled: getOptionStatus(opt.flag, cmd, { command: cmd.name, system, options: selections[cmd.name] || new Set(), args: {} }).disabled
              }"
              @click="toggleOption(cmd, opt.flag)"
            >
              <span class="flag">{{ opt.flag }}</span>
              <span class="label">{{ opt.desc }}</span>
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredResults.length === 0" class="empty-state">
        未找到匹配 "{{ query }}" 的命令
      </div>
    </div>

    <!-- 默认推荐 -->
    <div class="initial-state" v-if="!query">
      <div class="hint-card">
        <h3>💡 快速开始</h3>
        <p>在上方搜索框输入命令。系统会自动为您展示对应的常用参数及其含义，您可以直接点击参数来组装命令。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bash-explorer {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: var(--vt-font-family-base);
}

/* 系统切换器样式 */
.top-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.system-toggle {
  display: flex;
  background-color: var(--vt-c-bg-soft);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--vt-c-divider-light);
}

.system-toggle button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  color: var(--vt-c-text-2);
}

.system-toggle button.active {
  background-color: var(--vt-c-bg);
  color: var(--vt-c-brand);
  box-shadow: var(--vt-shadow-1);
}

/* 搜索框样式 */
.search-section {
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--vt-c-bg-soft);
  border: 2px solid var(--vt-c-divider);
  border-radius: 12px;
  padding: 16px 24px;
  transition: all 0.3s;
}

.search-input-wrapper:focus-within {
  border-color: var(--vt-c-brand);
  background-color: var(--vt-c-bg);
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.1);
}

.prefix {
  font-family: var(--vt-font-family-mono);
  font-weight: 700;
  color: var(--vt-c-brand);
  font-size: 24px;
  margin-right: 15px;
  user-select: none;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 20px;
  color: var(--vt-c-text-1);
  font-family: var(--vt-font-family-mono);
}

input:focus {
  outline: none;
}

.search-hint {
  position: absolute;
  right: 24px;
  font-size: 12px;
  color: var(--vt-c-text-3);
  pointer-events: none;
}

/* 结果列表样式 */
.results-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cmd-item {
  background-color: var(--vt-c-bg-soft);
  border: 1px solid var(--vt-c-divider-light);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.cmd-header {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.name {
  font-size: 20px;
  font-weight: 700;
  color: var(--vt-c-text-1);
  font-family: var(--vt-font-family-mono);
}

.desc {
  font-size: 14px;
  color: var(--vt-c-text-2);
}

.preview-row {
  background-color: var(--vt-c-black-soft);
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
}

.preview-row:hover {
  border-color: var(--vt-c-brand);
}

.preview-row code {
  color: #42d392;
  font-family: var(--vt-font-family-mono);
  font-size: 14px;
}

.copy-hint {
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
}

/* 二级抽屉样式 */
.options-drawer {
  background-color: var(--vt-c-bg-mute);
  padding: 16px 20px;
  border-top: 1px solid var(--vt-c-divider-light);
}

.drawer-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vt-c-text-3);
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.options-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: var(--vt-c-bg);
  border: 1px solid var(--vt-c-divider);
  border-radius: 6px;
  font-size: 13px;
  transition: all 0.2s;
  cursor: pointer;
}

.option-tag:hover:not(.disabled) {
  border-color: var(--vt-c-brand);
}

.option-tag.selected {
  background-color: var(--vt-c-brand);
  border-color: var(--vt-c-brand);
  color: white;
}

.option-tag.selected .flag {
  color: white;
}

.option-tag .flag {
  font-family: var(--vt-font-family-mono);
  font-weight: 700;
  color: var(--vt-c-brand);
}

.option-tag.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: transparent;
}

.empty-state, .initial-state {
  padding: 60px;
  text-align: center;
  color: var(--vt-c-text-3);
}

.hint-card {
  background-color: var(--vt-c-bg-soft);
  padding: 30px;
  border-radius: 16px;
  border: 1px dashed var(--vt-c-divider);
}

.hint-card h3 {
  margin-top: 0;
  color: var(--vt-c-text-1);
}

@media (max-width: 768px) {
  .title-row {
    flex-direction: column;
    gap: 4px;
  }

  .preview-row code {
    font-size: 12px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { data as bashGroups } from './bash.data'
import type { CommandData, CommandOption, ParsedCommand } from './types'
import { parseCommand, matchCommandNames, matchOptions, generateExplanation } from './builder'

const inputQuery = ref('')
const searchInput = ref<HTMLInputElement>()
const showDropdown = ref(false)
const dropdownRef = ref<HTMLElement>()

const allCommands = computed(() => bashGroups.flatMap(g => g.commands))
const parsed = computed<ParsedCommand>(() => parseCommand(inputQuery.value, allCommands.value))

const matchedCommands = computed(() => {
  const query = inputQuery.value.trim().split(/\s+/)[0] || ''
  if (!query) return []
  return matchCommandNames(query, allCommands.value)
})

const filteredGroups = computed(() => {
  if (!inputQuery.value.trim()) return bashGroups
  const query = inputQuery.value.trim().split(/\s+/)[0].toLowerCase()
  return bashGroups.map(group => ({
    ...group,
    commands: group.commands.filter(cmd =>
      cmd.name.toLowerCase().includes(query) || cmd.desc.toLowerCase().includes(query)
    )
  })).filter(group => group.commands.length > 0)
})

const matchedOptions = computed(() => {
  if (!parsed.value.command) return []
  return matchOptions(parsed.value.command, parsed.value.currentFragment, parsed.value.selectedOptions)
})

const dynamicExplanation = computed(() => generateExplanation(parsed.value))

watch(inputQuery, (val) => {
  showDropdown.value = !!val.trim()
})

function selectCommand(cmd: CommandData) {
  inputQuery.value = cmd.name + ' '
  searchInput.value?.focus()
}

function selectOption(opt: CommandOption) {
  const currentTokens = inputQuery.value.trimEnd().split(/\s+/)
  if (parsed.value.currentFragment) {
    currentTokens[currentTokens.length - 1] = opt.flag
  } else {
    currentTokens.push(opt.flag)
  }
  inputQuery.value = currentTokens.join(' ') + ' '
  searchInput.value?.focus()
}

// 复制逻辑
const isCopied = ref(false)
async function copyToClipboard() {
  if (!inputQuery.value) return
  try {
    await navigator.clipboard.writeText(inputQuery.value.trim())
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  } catch (err) {
    console.error('Copy failed', err)
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node) &&
      searchInput.value && !searchInput.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  searchInput.value?.focus()
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="bash-explorer">
    <!-- 上半部分：搜索与匹配 -->
    <div class="explorer-header">
      <div class="search-container">
        <div class="input-wrapper shadow-2">
          <span class="prompt">$</span>
          <input
            ref="searchInput"
            v-model="inputQuery"
            type="text"
            placeholder="输入或搜索命令内容..."
            spellcheck="false"
            autocomplete="off"
            @focus="showDropdown = !!inputQuery.trim()"
          />
          <button
            class="copy-button"
            :class="{ copied: isCopied }"
            @click="copyToClipboard"
            :disabled="!inputQuery"
            title="Copy Code"
          ></button>
        </div>

        <!-- 动态命令解释 -->
        <div class="dynamic-explanation" :class="{ active: inputQuery.trim() }">
          {{ dynamicExplanation }}
        </div>

        <!-- 智能下拉补全 -->
        <Transition name="dropdown-fade">
          <div v-if="showDropdown" ref="dropdownRef" class="suggestion-dropdown">
            <template v-if="!parsed.command">
              <div
                v-for="cmd in matchedCommands"
                :key="cmd.name"
                class="dropdown-item cmd-item"
                @click="selectCommand(cmd)"
              >
                <span class="cmd-name">{{ cmd.name }}</span>
                <span class="cmd-desc">{{ cmd.desc }}</span>
              </div>
              <div v-if="matchedCommands.length === 0" class="empty-dropdown">
                未识别到对应命令
              </div>
            </template>

            <template v-else>
              <div class="dropdown-header">可用参数联想</div>
              <div
                v-for="opt in matchedOptions"
                :key="opt.flag"
                class="dropdown-item opt-item"
                @click="selectOption(opt)"
              >
                <div class="opt-labels">
                  <span class="opt-flag">{{ opt.flag }}</span>
                  <span v-if="opt.long" class="opt-long">{{ opt.long }}</span>
                </div>
                <span class="opt-desc">{{ opt.desc }}</span>
              </div>
              <div v-if="matchedOptions.length === 0" class="empty-dropdown">
                该命令无更多可用参数
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="explorer-divider"></div>

    <!-- 下半部分：命令罗列 -->
    <div class="explorer-body">
      <div class="dashboard-grid">
        <div v-for="group in filteredGroups" :key="group.categoryEn" class="category-card shadow-1">
          <h3 class="category-title">{{ group.category }}</h3>
          <ul class="command-list">
            <li
              v-for="cmd in group.commands"
              :key="cmd.name"
              class="command-row"
              @click="selectCommand(cmd)"
            >
              <span class="command-name">{{ cmd.name }}</span>
              <span class="command-desc">{{ cmd.desc }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="filteredGroups.length === 0" class="global-empty-state">
        未找到匹配的命令或参数
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 响应式变量与基础布局 */
.bash-explorer {
  max-width: 1024px; /* 为了适配三列，略微增加容器宽度 */
  min-height: 800px;
  margin: 0 auto;
  padding: 64px 32px;
  font-family: var(--vt-font-family-base);
}

.explorer-header {
  padding-bottom: 36px;
}

.explorer-divider {
  border-top: 1px solid var(--vt-c-divider-light);
  margin-bottom: 48px;
}

/* 1. 搜索与输入框 */
.search-container {
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--vt-c-bg);
  border-radius: 8px;
  padding: 4px 12px 4px 16px;
  position: relative;
  border: 2px solid transparent;
  background-image: linear-gradient(var(--vt-c-bg), var(--vt-c-bg)),
                    -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: box-shadow 0.2s;
  height: 48px;
}

.input-wrapper:focus-within {
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.1);
}

.prompt {
  font-family: var(--vt-font-family-mono);
  font-weight: 700;
  color: var(--vt-c-green);
  font-size: 18px;
  margin-right: 12px;
  user-select: none;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #9ECBFF;
  font-family: var(--vt-font-family-mono);
  min-width: 0;
}

input:focus {
  outline: none;
}

/* 复制按钮样式 (参照 VitePress 官方风格) */
.copy-button {
  --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgba(128,128,128,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3C/svg%3E");
  --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgba(128,128,128,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='m9 14 2 2 4-4'/%3E%3C/svg%3E");
  --vp-code-copy-copied-text-content: "Copied";
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: transparent;
  background-image: var(--vp-icon-copy);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s, opacity 0.25s, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  flex-shrink: 0;
}

.copy-button:active {
  transform: scale(0.9);
}

.copy-button:hover:not(:disabled) {
  background-color: var(--vp-code-copy-code-hover-bg, var(--vt-c-bg-mute));
  border-color: var(--vp-code-copy-code-hover-border-color, var(--vt-c-divider));
}

.copy-button:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.copy-button.copied {
  background-image: var(--vp-icon-copied);
  border-radius: 0 4px 4px 0;
  background-color: var(--vt-c-bg-mute);
  animation: copy-pop 0.3s ease;
}

@keyframes copy-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Copied 字样弹出效果 */
.copy-button.copied::before {
  content: var(--vp-code-copy-copied-text-content);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(calc(-100% - 2px));
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 0;
  border-radius: 4px 0 0 4px;
  padding: 0 6px;
  width: fit-content;
  height: 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-dark-2);
  background-color: var(--vt-c-bg-mute);
  white-space: nowrap;
  animation: text-slide-in 0.2s ease-out;
}

@keyframes text-slide-in {
  from { opacity: 0; transform: translateX(-80%); }
  to { opacity: 1; transform: translateX(calc(-100% - 2px)); }
}

/* 动态说明 */
.dynamic-explanation {
  margin-top: 10px;
  padding-left: 32px;
  font-size: 13px;
  color: var(--vt-c-text-2);
  min-height: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.dynamic-explanation.active {
  opacity: 1;
}

/* 下拉列表 */
.suggestion-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--vt-c-bg);
  border: 1px solid var(--vt-c-divider);
  border-radius: 12px;
  margin-top: 8px;
  max-height: 360px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  width: 100%;
}

.dropdown-header {
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  color: var(--vt-c-text-3);
  background-color: var(--vt-c-bg-soft);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dropdown-item:hover {
  background-color: var(--vt-c-bg-soft);
}

.cmd-name, .opt-flag {
  font-weight: 700;
  color: var(--vt-c-green);
  font-family: var(--vp-font-family-mono);
}

.cmd-desc, .opt-desc {
  font-size: 13px;
  color: var(--vt-c-text-2);
}

.opt-labels {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.opt-long {
  font-size: 12px;
  color: var(--vt-c-text-3);
  font-family: var(--vp-font-family-mono);
}

/* 2. 命令仪表盘 (响应式列布局) */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.category-card {
  background-color: var(--vt-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--vt-c-divider-light);
}

.category-title {
  color: var(--vt-c-green);
  font-size: 18px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 20px;
}

.command-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.command-row {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.1s;
}

.command-row:hover .command-name {
  color: var(--vt-c-green);
}

.command-name {
  color: var(--vt-c-text-code);
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
  white-space: nowrap;
}

.command-desc {
  color: var(--vt-c-text-2);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .bash-explorer {
    padding: 42px 24px;
  }
}

/* 辅助动效 */
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.global-empty-state {
  text-align: center;
  padding: 60px;
  color: var(--vt-c-text-3);
}
</style>

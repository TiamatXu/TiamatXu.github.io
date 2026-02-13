<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { data as bashGroups } from './bash.data'
import type { CommandData } from './types'
import CommandBuilder from './components/CommandBuilder.vue'

const query = ref('')
const selectedCommand = ref<CommandData | null>(null)
const searchInput = ref<HTMLInputElement>()
const showDropdown = ref(false)

onMounted(() => {
  searchInput.value?.focus()
})

const normalize = (s: string) => s.toLowerCase().trim()

// 平铺所有命令方便搜索
const allCommands = computed(() => {
  return bashGroups.flatMap(g => g.commands)
})

const searchResults = computed(() => {
  const q = normalize(query.value)
  if (!q) return []
  return allCommands.value.filter(cmd => 
    normalize(cmd.name).includes(q) || normalize(cmd.desc).includes(q)
  ).slice(0, 8) // 最多显示8个结果
})

// 当有搜索结果且用户正在输入时显示下拉列表
watch(query, (newVal) => {
  showDropdown.value = newVal.length > 0
})

function selectCommand(cmd: CommandData) {
  selectedCommand.value = cmd
  query.value = cmd.name
  showDropdown.value = false
}

function clearSearch() {
  query.value = ''
  selectedCommand.value = null
  showDropdown.value = false
  searchInput.value?.focus()
}
</script>

<template>
  <div class="bash-container">
    <div class="search-wrapper" :class="{ 'is-focused': showDropdown || selectedCommand }">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input
          ref="searchInput"
          type="search"
          v-model="query"
          placeholder="输入 Linux 命令 (如 ls, grep)..."
          @focus="showDropdown = query.length > 0"
          @keydown.escape="showDropdown = false"
        />
        <button v-if="query || selectedCommand" class="clear-btn" @click="clearSearch">✕</button>
      </div>

      <!-- 动态下拉列表 -->
      <Transition name="fade">
        <div v-if="showDropdown && searchResults.length > 0" class="search-dropdown">
          <div 
            v-for="cmd in searchResults" 
            :key="cmd.name" 
            class="dropdown-item"
            @click="selectCommand(cmd)"
          >
            <div class="item-info">
              <span class="item-name">{{ cmd.name }}</span>
              <span class="item-desc">{{ cmd.desc }}</span>
            </div>
            <div class="item-flags" v-if="cmd.options">
              <span v-for="opt in cmd.options.slice(0, 3)" :key="opt.flag" class="mini-flag">
                {{ opt.flag }}
              </span>
              <span v-if="cmd.options.length > 3" class="more">...</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <main class="content-area">
      <!-- 选中的命令构建器：直接出现在顶部 -->
      <Transition name="slide-up">
        <div v-if="selectedCommand" class="active-builder-card">
          <div class="builder-meta">
            <span class="breadcrumb">BASH / {{ selectedCommand.category }}</span>
            <h2>{{ selectedCommand.name }} <small>{{ selectedCommand.desc }}</small></h2>
          </div>
          <CommandBuilder :key="selectedCommand.name" :data="selectedCommand" />
        </div>
      </Transition>

      <!-- 默认分类展示：仅在未选中命令时显示 -->
      <div v-if="!selectedCommand" class="default-view">
        <div v-for="group in bashGroups" :key="group.category" class="cat-group">
          <h3 class="cat-title">{{ group.category }}</h3>
          <div class="cat-list">
            <button 
              v-for="cmd in group.commands" 
              :key="cmd.name" 
              class="cat-item"
              @click="selectCommand(cmd)"
            >
              <span class="cmd-name">{{ cmd.name }}</span>
              <span class="cmd-desc">{{ cmd.desc }}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.bash-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px;
}

.search-wrapper {
  position: relative;
  z-index: 100;
  margin-bottom: 40px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: var(--vt-c-bg-soft);
  border: 2px solid var(--vt-c-divider);
  border-radius: 12px;
  padding: 12px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--vt-shadow-2);
}

.search-wrapper.is-focused .search-bar {
  border-color: var(--vt-c-brand);
  background-color: var(--vt-c-bg);
  box-shadow: 0 8px 30px rgba(66, 184, 131, 0.15);
  transform: translateY(-2px);
}

.search-icon {
  margin-right: 12px;
  font-size: 20px;
  opacity: 0.5;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 18px;
  color: var(--vt-c-text-1);
  font-family: var(--vt-font-family-base);
}

input:focus {
  outline: none;
}

.clear-btn {
  padding: 4px 8px;
  color: var(--vt-c-text-3);
  font-size: 14px;
}

.clear-btn:hover {
  color: var(--vt-c-red);
}

/* 下拉列表样式 */
.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: var(--vt-c-bg);
  border: 1px solid var(--vt-c-divider);
  border-radius: 12px;
  box-shadow: var(--vt-shadow-4);
  overflow: hidden;
  animation: popIn 0.2s ease-out;
}

@keyframes popIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  border-bottom: 1px solid var(--vt-c-divider-light);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: var(--vt-c-bg-soft);
}

.item-name {
  display: block;
  font-weight: 700;
  color: var(--vt-c-brand);
  font-family: var(--vt-font-family-mono);
  font-size: 16px;
}

.item-desc {
  font-size: 13px;
  color: var(--vt-c-text-2);
}

.item-flags {
  display: flex;
  gap: 4px;
}

.mini-flag {
  font-size: 11px;
  background-color: var(--vt-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vt-font-family-mono);
  color: var(--vt-c-text-2);
}

.more {
  font-size: 11px;
  color: var(--vt-c-text-3);
}

/* 构建器展示卡片 */
.active-builder-card {
  background-color: var(--vt-c-bg);
  border: 1px solid var(--vt-c-divider);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--vt-shadow-3);
}

.builder-meta {
  margin-bottom: 24px;
}

.breadcrumb {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vt-c-text-3);
  letter-spacing: 1px;
}

h2 {
  margin: 8px 0 0 0;
  font-size: 28px;
  font-weight: 800;
}

h2 small {
  font-size: 16px;
  font-weight: 400;
  color: var(--vt-c-text-2);
  margin-left: 12px;
}

/* 默认分类视图 */
.default-view {
  display: grid;
  gap: 40px;
}

.cat-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--vt-c-text-3);
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.cat-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.cat-item {
  text-align: left;
  padding: 16px;
  background-color: var(--vt-c-bg-soft);
  border: 1px solid var(--vt-c-divider-light);
  border-radius: 10px;
  transition: all 0.2s;
}

.cat-item:hover {
  border-color: var(--vt-c-brand);
  background-color: var(--vt-c-bg-mute);
}

.cmd-name {
  display: block;
  font-weight: 600;
  color: var(--vt-c-text-1);
}

.cmd-desc {
  font-size: 12px;
  color: var(--vt-c-text-2);
}

/* 动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active { transition: all 0.4s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import contributionData from '../contribution-data.json'

// --- Type Definitions ---
type ContributionLevel = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'

interface ContributionDay {
  contributionCount: number
  date: string // YYYY-MM-DD
  weekday: number // 0 (Sunday) to 6 (Saturday)
  contributionLevel: ContributionLevel
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
  error?: string
}

// --- Props ---
defineProps<{
  githubUsername: string
}>()

// --- Component Logic ---
const calendar = contributionData as ContributionCalendar

const calendarContainerRef = ref<HTMLDivElement | null>(null)

// Tooltip state
const showTooltip = ref(false)
const tooltipContent = ref('')
const tooltipPos = ref({ x: 0, y: 0 })

// Data transformation for table rendering (7 rows for days, N columns for weeks)
const grid = computed(() => {
  if (calendar.error || !calendar.weeks) return []
  const numWeeks = calendar.weeks.length
  // Initialize a 7xN grid with nulls
  const grid: (ContributionDay | null)[][] = Array.from({ length: 7 }, () => Array(numWeeks).fill(null))

  calendar.weeks.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      // day.weekday is 0 (Sun) to 6 (Sat)
      if (day.weekday < 7) {
        grid[day.weekday][weekIndex] = day
      }
    })
  })
  return grid
})

// Helper to find the starting week index for each month
const months = computed(() => {
  if (calendar.error || !calendar.weeks) return []
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const uniqueMonths: { name: string; weekIndex: number }[] = []

  calendar.weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = week.contributionDays[0]
    if (!firstDayOfWeek) return

    const date = new Date(firstDayOfWeek.date)
    const month = date.getMonth()
    // A new month label is added if the month of the first day of the week is different from the previous one.
    if (weekIndex === 0 || new Date(calendar.weeks[weekIndex - 1].contributionDays[0].date).getMonth() !== month) {
      uniqueMonths.push({
        name: monthNames[month],
        weekIndex: weekIndex
      })
    }
  })
  return uniqueMonths
})

// Calculate colspan for each month header
const monthsWithColspan = computed(() => {
  if (!months.value?.length) return []
  const weeksCount = grid.value[0]?.length ?? 0
  const spans: { name: string; colspan: number }[] = []
  for (let i = 0; i < months.value.length; i++) {
    const current = months.value[i]
    const next = months.value[i + 1]
    const colspan = next ? next.weekIndex - current.weekIndex : weeksCount - current.weekIndex
    if (colspan > 0) {
      spans.push({ name: colspan > 1 ? current.name : '', colspan })
    }
  }
  return spans
})

const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

// Helper to map contribution level to CSS class
const getLevelClass = (level: ContributionLevel) => {
  switch (level) {
    case 'NONE':
      return 'contrib-level-0'
    case 'FIRST_QUARTILE':
      return 'contrib-level-1'
    case 'SECOND_QUARTILE':
      return 'contrib-level-2'
    case 'THIRD_QUARTILE':
      return 'contrib-level-3'
    case 'FOURTH_QUARTILE':
      return 'contrib-level-4'
    default:
      return 'contrib-level-0'
  }
}

const getTooltipText = (day: ContributionDay) => {
  return day.contributionCount === 0 ? `${day.date} | 无贡献` : `${day.date} | ${day.contributionCount} 次贡献`
}

const handleMouseOver = (event: MouseEvent, day: ContributionDay) => {
  showTooltip.value = true
  tooltipContent.value = getTooltipText(day)

  if (!calendarContainerRef.value) return

  const calendarRect = calendarContainerRef.value.getBoundingClientRect()
  const cellRect = (event.target as HTMLElement).getBoundingClientRect()

  tooltipPos.value = {
    x: cellRect.left - calendarRect.left + cellRect.width / 2,
    y: cellRect.top - calendarRect.top
  }
}

const handleMouseOut = () => {
  showTooltip.value = false
}
</script>

<template>
  <div v-if="calendar.error" class="error-message">
    获取贡献数据失败: {{ calendar.error }} <br />请确保 `CONTRIBUTIONS_TOKEN` 已正确配置，且 GitHub 用户名 `{{
      githubUsername
    }}` 正确。
  </div>

  <div v-else class="contribution-calendar" ref="calendarContainerRef">
    <div class="contribution-grid-wrapper">
      <table class="contribution-grid" @mouseleave="handleMouseOut">
        <thead>
          <tr>
            <th class="weekday-spacer"></th>
            <th v-for="month in monthsWithColspan" :key="month.name" :colspan="month.colspan" class="month-header">
              {{ month.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, dayIndex) in grid" :key="dayIndex">
            <th class="weekday-label">{{ weekdayLabels[dayIndex] }}</th>
            <td
              v-for="(day, weekIndex) in row"
              :key="weekIndex"
              :class="['contribution-cell', day ? getLevelClass(day.contributionLevel) : 'contribution-cell-empty']"
              @mouseenter="day ? handleMouseOver($event, day) : undefined"
              @mouseleave="day ? handleMouseOut : undefined"
            >
              <a
                v-if="day"
                :href="`https://github.com/${githubUsername}?tab=overview&from=${day.date}&to=${day.date}`"
                target="_blank"
                rel="noopener noreferrer"
                class="cell-link"
              >
                <span class="sr-only">{{ getTooltipText(day) }}</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="calendar-footer">
      <a class="footer-link" href="https://github.com/TiamatXu" target="_blank" rel="noopener noreferrer">
        Learn how to achieve the same effect. (Not configured)
      </a>
      <div class="legend">
        <span class="legend-label">Less</span>
        <ul class="legend-colors">
          <li data-level="0" :class="['contribution-cell', 'contrib-level-0']"></li>
          <li data-level="1" :class="['contribution-cell', 'contrib-level-1']"></li>
          <li data-level="2" :class="['contribution-cell', 'contrib-level-2']"></li>
          <li data-level="3" :class="['contribution-cell', 'contrib-level-3']"></li>
          <li data-level="4" :class="['contribution-cell', 'contrib-level-4']"></li>
        </ul>
        <span class="legend-label">More</span>
      </div>
    </div>
    <!-- Tooltip -->
    <div
      v-if="showTooltip"
      class="contribution-tooltip"
      :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px' }"
    >
      {{ tooltipContent }}
    </div>
  </div>
</template>

<style>
/* Define GitHub-like colors for contribution levels */
:root {
  /* Light mode defaults */
  --color-contrib-text: #24292f;
  --color-legend-text: rgba(36, 41, 47, 0.7);
  --color-contrib-level-0: #ebedf0;
  --color-contrib-level-1: #9be9a8;
  --color-contrib-level-2: #40c463;
  --color-contrib-level-3: #30a14e;
  --color-contrib-level-4: #216e39;
}

html.dark {
  /* Dark mode overrides */
  --color-contrib-text: #c9d1d9;
  --color-legend-text: rgba(201, 209, 217, 0.7);
  --color-contrib-level-0: #222830;
  --color-contrib-level-1: #0e4429;
  --color-contrib-level-2: #006d32;
  --color-contrib-level-3: #26a641;
  --color-contrib-level-4: #39d353;
}

.contribution-grid-wrapper {
  scrollbar-width: thin;
  scrollbar-color: rgba(61, 68, 77, 0.5) transparent;
}

.contribution-grid-wrapper::-webkit-scrollbar {
  height: 10px;
}

.contribution-grid-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.contribution-grid-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(61, 68, 77, 0.5);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: background-color 0.15s ease;
}

.contribution-grid-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(61, 68, 77, 0.7);
}

html.dark .contribution-grid-wrapper {
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}

html.dark .contribution-grid-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.25);
}

html.dark .contribution-grid-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.45);
}

.contribution-grid-wrapper::-webkit-scrollbar-track-piece {
  background: transparent;
}
</style>

<style scoped>
/* 为组件内所有颜色相关属性添加过渡（color 与 background-color）*/
.contribution-calendar * {
  transition:
    color 0.5s,
    background-color 0.5s;
}

.error-message {
  color: var(--vt-c-text-1);
  margin-top: 20px;
  font-size: 12px;
}

.contribution-calendar {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
}

.contribution-grid-wrapper {
  overflow-x: auto;
}

.contribution-grid {
  border-collapse: separate;
  border-spacing: 3px;
  min-width: max-content;
}

.contribution-grid thead {
  font-size: 12px;
  color: var(--color-contrib-text);
  position: relative;
  top: 5px;
}

.month-header {
  font-weight: normal;
  text-align: left;
  padding-bottom: 0;
  white-space: nowrap;
}

.weekday-spacer,
.weekday-label {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: var(--vt-c-bg);
  //box-shadow: 3px 0 0 0 var(--vp-c-bg-soft);
}

.weekday-label {
  font-size: 12px;
  color: var(--color-contrib-text);
  font-weight: normal;
  text-align: left;
  padding-right: 1px;
  white-space: nowrap;
  line-height: 1;
  box-sizing: border-box;
}

.contribution-cell {
  width: 14px;
  height: 14px;
  background-color: var(--color-contrib-level-0);
  border-radius: 3px;
  outline: 2px solid transparent;
}

.contribution-grid .contribution-cell:not(.contribution-cell-empty):hover {
  outline-color: rgba(0, 0, 0, 0.2);
}

html.dark .contribution-grid .contribution-cell:not(.contribution-cell-empty):hover {
  outline-color: rgba(255, 255, 255, 0.4);
}

.contribution-cell.contribution-cell-empty {
  background-color: transparent;
}

.cell-link {
  display: block;
  width: 100%;
  height: 100%;
}

.contrib-level-0 {
  background-color: var(--color-contrib-level-0);
}

.contrib-level-1 {
  background-color: var(--color-contrib-level-1);
}

.contrib-level-2 {
  background-color: var(--color-contrib-level-2);
}

.contrib-level-3 {
  background-color: var(--color-contrib-level-3);
}

.contrib-level-4 {
  background-color: var(--color-contrib-level-4);
}

.calendar-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 4px 0 0 0;
  font-size: 12px;
  gap: 8px;
}

.legend {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.legend-label {
  color: var(--color-legend-text);
  margin: 0 4px;
  white-space: nowrap;
}

.legend-colors {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 3px;
}

.legend-colors li {
  width: 14px;
  height: 14px;
}

.footer-link {
  color: var(--color-legend-text);
  text-decoration: none;
  text-align: left;
}

.footer-link:hover {
  color: var(--vt-c-green);
  text-decoration: underline;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.contribution-tooltip {
  position: absolute;
  padding: 8px 12px;
  background-color: #3d444d;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  transform: translateX(-50%) translateY(-100%) translateY(-8px); /* Adjusted for positioning above */
  box-sizing: border-box;
}

.contribution-tooltip::after {
  content: '';
  position: absolute;
  top: 100%; /* Position arrow at the bottom of the tooltip */
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #3d444d transparent transparent transparent; /* Arrow pointing downwards */
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import contributionData from '../contribution-data.json'

// --- Type Definitions ---
type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

interface ContributionDay {
  contributionCount: number;
  date: string; // YYYY-MM-DD
  weekday: number; // 0 (Sunday) to 6 (Saturday)
  contributionLevel: ContributionLevel;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
  error?: string; // Added for error handling
}

// --- Props ---
defineProps<{
  githubUsername: string;
}>();

// --- Component Logic ---
const calendar = contributionData as ContributionCalendar;

const chartWidth = 700; // Overall width of the SVG
const chartHeight = 112; // Overall height of the SVG
const cellMargin = 2; // Margin between cells
const cellSize = 10; // Size of each square cell
const headerHeight = 20; // Space for month names
const monthLabelOffset = 15; // Offset for month labels from the top
const weekLabelOffset = 15; // Offset for weekday labels from the left

// Tooltip state
const showTooltip = ref(false);
const tooltipContent = ref('');
const tooltipPos = ref({ x: 0, y: 0 });

// Helper to determine the x-position for month labels
const months = computed(() => {
  if (calendar.error || !calendar.weeks) {
    return [];
  }
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const uniqueMonths: { name: string, x: number }[] = [];
  let currentMonth = -1;

  calendar.weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = week.contributionDays[0];
    if (firstDayOfWeek) {
      const date = new Date(firstDayOfWeek.date);
      const month = date.getMonth();
      if (weekIndex === 0 || new Date(calendar.weeks[weekIndex - 1].contributionDays[0].date).getMonth() !== month) {
        uniqueMonths.push({
          name: monthNames[month],
          x: weekIndex * (cellSize + cellMargin) + weekLabelOffset
        });
        currentMonth = month;
      }
    }
  });
  return uniqueMonths;
});

const weekdayLabels = [
  { label: '周一', y: headerHeight + (cellSize + cellMargin) * 1 + cellSize / 2 },
  { label: '周三', y: headerHeight + (cellSize + cellMargin) * 3 + cellSize / 2 },
  { label: '周五', y: headerHeight + (cellSize + cellMargin) * 5 + cellSize / 2 },
];

const getLevelClass = (level: ContributionLevel) => {
  switch (level) {
    case 'NONE': return 'contrib-level-0';
    case 'FIRST_QUARTILE': return 'contrib-level-1';
    case 'SECOND_QUARTILE': return 'contrib-level-2';
    case 'THIRD_QUARTILE': return 'contrib-level-3';
    case 'FOURTH_QUARTILE': return 'contrib-level-4';
    default: return 'contrib-level-0';
  }
};

const getTooltipText = (day: ContributionDay) => {
  return day.contributionCount === 0
    ? `${day.date}：无贡献`
    : `${day.date}：${day.contributionCount} 贡献`;
};

const handleMouseOver = (event: MouseEvent, day: ContributionDay) => {
  if (day.date) {
    showTooltip.value = true;
    tooltipContent.value = getTooltipText(day);
    tooltipPos.value = { x: event.clientX + 10, y: event.clientY + 10 };
  }
};

const handleMouseOut = () => {
  showTooltip.value = false;
};
</script>

<template>
  <div v-if="calendar.error" class="error-message">
    获取贡献数据失败: {{ calendar.error }}
    <br>请确保 `CONTRIBUTIONS_TOKEN` 已正确配置，且 GitHub 用户名 `{{ githubUsername }}` 正确。
  </div>
  <div v-else class="chart-container">
    <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer">
      <svg
        :width="chartWidth"
        :height="chartHeight"
        class="contribution-graph"
        viewBox="0 0 700 112"
        preserveAspectRatio="xMinYMin meet"
      >
        <!-- Weekday Labels -->
        <g class="weekday-labels">
          <text
            v-for="(dayLabel, index) in weekdayLabels"
            :key="index"
            :x="weekLabelOffset - 10"
            :y="dayLabel.y"
            alignment-baseline="middle"
            text-anchor="end"
            class="graph-label"
          >
            {{ dayLabel.label }}
          </text>
        </g>

        <!-- Month Labels -->
        <g class="month-labels">
          <text
            v-for="(month, index) in months"
            :key="index"
            :x="month.x"
            :y="monthLabelOffset"
            class="graph-label"
          >
            {{ month.name }}
          </text>
        </g>

        <!-- Contribution Cells -->
        <g
          v-for="(week, weekIndex) in calendar.weeks"
          :key="weekIndex"
          :transform="`translate(${weekIndex * (cellSize + cellMargin) + weekLabelOffset}, ${headerHeight})`"
          class="week-column"
        >
          <rect
            v-for="day in week.contributionDays"
            :key="day.date"
            :width="cellSize"
            :height="cellSize"
            :x="0"
            :y="day.weekday * (cellSize + cellMargin)"
            :class="['contribution-cell', getLevelClass(day.contributionLevel)]"
            rx="2"
            ry="2"
            @mouseover="handleMouseOver($event, day)"
            @mouseout="handleMouseOut"
          >
            <title>{{ getTooltipText(day) }}</title>
          </rect>
        </g>
      </svg>
    </a>
    <!-- Tooltip -->
    <div v-if="showTooltip" class="contribution-tooltip" :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px' }">
      {{ tooltipContent }}
    </div>
  </div>
</template>

<style scoped>
:root {
  --color-contrib-level-0: #ebedf0;
  --color-contrib-level-1: #9be9a8;
  --color-contrib-level-2: #40c463;
  --color-contrib-level-3: #30a14e;
  --color-contrib-level-4: #216e39;
}

.dark {
  --color-contrib-level-0: #161b22;
  --color-contrib-level-1: #0e4429;
  --color-contrib-level-2: #006d32;
  --color-contrib-level-3: #26a641;
  --color-contrib-level-4: #39d353;
}

.error-message {
  color: var(--vp-c-danger-1);
  margin-top: 20px;
  font-size: 1.1em;
}

.chart-container {
  display: inline-block;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 10px;
}

.contribution-graph {
  display: block;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
}

.contribution-cell {
  shape-rendering: geometricPrecision;
  transition: fill 0.3s ease-in-out;
}

.contribution-cell:hover {
  stroke: var(--vp-c-brand-1);
  stroke-width: 1px;
}

.contrib-level-0 { fill: var(--color-contrib-level-0); }
.contrib-level-1 { fill: var(--color-contrib-level-1); }
.contrib-level-2 { fill: var(--color-contrib-level-2); }
.contrib-level-3 { fill: var(--color-contrib-level-3); }
.contrib-level-4 { fill: var(--color-contrib-level-4); }

.graph-label {
  fill: var(--vp-c-text-2);
  font-size: 9px;
}

.contribution-tooltip {
  position: fixed;
  padding: 8px 12px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

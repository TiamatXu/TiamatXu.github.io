<script setup lang="ts">
import {ref, computed} from 'vue'
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

// Constants for SVG layout
const chartHeight = 135; // Increased height for legend
const cellMargin = 2; // Margin between cells
const cellSize = 10; // Size of each square cell
const headerHeight = 20; // Space for month names
const monthLabelOffset = 15; // Offset for month labels from the top
const weekLabelOffset = 40; // Increased offset for weekday labels from the left edge

// Tooltip state
const showTooltip = ref(false);
const tooltipContent = ref('');
const tooltipPos = ref({x: 0, y: 0});

// Dynamically calculate the total width of the chart based on actual number of weeks
const computedChartWidth = computed(() => {
  if (calendar.error || !calendar.weeks || calendar.weeks.length === 0) return 700; // Fallback width
  const numWeeks = calendar.weeks.length;
  // Calculate max x-coordinate reached by the last column + space for labels/padding
  return (numWeeks * (cellSize + cellMargin)) + weekLabelOffset + cellSize + 5; // Add a little extra padding
});

// Helper to determine the x-position for month labels
const months = computed(() => {
  if (calendar.error || !calendar.weeks) {
    return [];
  }
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const uniqueMonths: { name: string, x: number }[] = [];
  let currentMonth = -1;

  calendar.weeks.forEach((week, weekIndex) => {
    // We base the month label on the first day of the week to determine the month for the column
    const firstDayOfWeek = week.contributionDays[0];
    if (firstDayOfWeek) {
      const date = new Date(firstDayOfWeek.date);
      const month = date.getMonth();

      // If it's a new month and this is the first column for it, add the label
      // Also ensure it's not the same month as the very first week's month if it's the first week
      if (month !== currentMonth &&
        (weekIndex === 0 || new Date(calendar.weeks[weekIndex - 1].contributionDays[0].date).getMonth() !== month)) {
        // Position the month label roughly in the middle of its first week column
        uniqueMonths.push({
          name: monthNames[month],
          x: weekIndex * (cellSize + cellMargin) + weekLabelOffset // Position at the start of the week column
        });
        currentMonth = month;
      }
    }
  });
  return uniqueMonths;
});

// Weekday labels: Adjusted for 0 (Sunday) to 6 (Saturday) mapping, with Sunday as y=0
const weekdayLabels = [
  {label: '周一', y: headerHeight + (cellSize + cellMargin) * 1 + cellSize / 2}, // Monday is index 1
  {label: '周三', y: headerHeight + (cellSize + cellMargin) * 3 + cellSize / 2}, // Wednesday is index 3
  {label: '周五', y: headerHeight + (cellSize + cellMargin) * 5 + cellSize / 2}, // Friday is index 5
];

// Helper to map contribution level to CSS class
const getLevelClass = (level: ContributionLevel) => {
  switch (level) {
    case 'NONE':
      return 'contrib-level-0';
    case 'FIRST_QUARTILE':
      return 'contrib-level-1';
    case 'SECOND_QUARTILE':
      return 'contrib-level-2';
    case 'THIRD_QUARTILE':
      return 'contrib-level-3';
    case 'FOURTH_QUARTILE':
      return 'contrib-level-4';
    default:
      return 'contrib-level-0'; // Fallback
  }
};

const getTooltipText = (day: ContributionDay) => {
  return day.contributionCount === 0 ? `${day.date} | 无贡献` : `${day.date} | ${day.contributionCount} 次贡献`;
};

const handleMouseOver = (event: MouseEvent, day: ContributionDay) => {
  if (day.date) {
    showTooltip.value = true;
    tooltipContent.value = getTooltipText(day);
    tooltipPos.value = {x: event.clientX + 10, y: event.clientY + 10};
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
        :viewBox="`0 0 ${computedChartWidth} ${chartHeight}`"
        class="contribution-graph"
        preserveAspectRatio="xMinYMin meet"
      >
        <!-- Weekday Labels (e.g., Mon, Wed, Fri) -->
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

        <!-- Legend -->
        <g :transform="`translate(${computedChartWidth - 130}, 115)`">
          <text text-anchor="start" class="legend-label" x="0" y="8">更少</text>
          <rect class="contribution-cell contrib-level-0" x="30" y="0" width="10" height="10" rx="2" ry="2" />
          <rect class="contribution-cell contrib-level-1" x="42" y="0" width="10" height="10" rx="2" ry="2" />
          <rect class="contribution-cell contrib-level-2" x="54" y="0" width="10" height="10" rx="2" ry="2" />
          <rect class="contribution-cell contrib-level-3" x="66" y="0" width="10" height="10" rx="2" ry="2" />
          <rect class="contribution-cell contrib-level-4" x="78" y="0" width="10" height="10" rx="2" ry="2" />
          <text text-anchor="start" class="legend-label" x="93" y="8">更多</text>
        </g>
      </svg>
    </a>
    <!-- Tooltip -->
    <div v-if="showTooltip" class="contribution-tooltip"
         :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px' }">
      {{ tooltipContent }}
    </div>
  </div>
</template>

<style>
/* Define GitHub-like colors for contribution levels */
:root { /* Light mode defaults */
  --color-contrib-text: #24292f;
  --color-legend-text: rgba(36, 41, 47, 0.7); /* Lighter text for legend */
  --color-contrib-level-0: #ebedf0;
  --color-contrib-level-1: #9be9a8;
  --color-contrib-level-2: #40c463;
  --color-contrib-level-3: #30a14e;
  --color-contrib-level-4: #216e39;
}

html.dark { /* Dark mode overrides */
  --color-contrib-text: #c9d1d9;
  --color-legend-text: rgba(201, 209, 217, 0.7); /* Same as other text in dark mode */
  --color-contrib-level-0: #222830;
  --color-contrib-level-1: #0e4429;
  --color-contrib-level-2: #006d32;
  --color-contrib-level-3: #26a641;
  --color-contrib-level-4: #39d353;
}
</style>

<style scoped>
.error-message {
  color: var(--vp-c-danger-1); /* Using VitePress danger color variable */
  margin-top: 20px;
  font-size: 12px;
}

.chart-container {
  display: inline-block; /* Allows text-align: center to work for its content */
  max-width: 100%;
  overflow-x: auto; /* For small screens to allow scrolling */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  padding-bottom: 10px; /* Space for scrollbar if needed */
}

.contribution-graph {
  display: block; /* To center with margin: 0 auto */
  width: 100%; /* Make SVG responsive to parent container */
  min-width: 700px; /* Ensure a minimum width for the graph */
  height: auto; /* Maintain aspect ratio */
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  border: 1px solid var(--vp-c-divider); /* Subtle border for the graph */
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft); /* Match VitePress theme background */
}

.contribution-cell {
  shape-rendering: geometricPrecision;
  /* Removed outline: 1px solid rgba(27,31,35,0.06); as it created issues with fill and theme */
  transition: fill 0.3s ease-in-out;
}

.contribution-cell:hover {
  stroke: var(--vp-c-brand-1); /* Highlight on hover using VitePress brand color */
  stroke-width: 1px;
}

/* Apply colors based on contribution level classes */
.contrib-level-0 {
  fill: var(--color-contrib-level-0);
}

.contrib-level-1 {
  fill: var(--color-contrib-level-1);
}

.contrib-level-2 {
  fill: var(--color-contrib-level-2);
}

.contrib-level-3 {
  fill: var(--color-contrib-level-3);
}

.contrib-level-4 {
  fill: var(--color-contrib-level-4);
}

.graph-label {
  fill: var(--color-contrib-text);
  font-size: 12px;
}

.legend-label {
  fill: var(--color-legend-text);
  font-size: 12px;
}

.contribution-tooltip {
  position: fixed; /* Use fixed positioning for tooltips */
  padding: 8px 12px;
  background-color: var(--vp-c-bg-alt); /* Using VitePress background color variable */
  color: var(--vp-c-text-1); /* Using VitePress text color variable */
  border: 1px solid var(--vp-c-divider); /* Using VitePress divider color variable */
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

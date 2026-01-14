import fetch from 'node-fetch';
import {writeFileSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';

// --- Configuration ---
const GITHUB_USERNAME = 'TiamatXu'; // <<< 请替换为您的 GitHub 用户名
const OUTPUT_FILE = join(process.cwd(), '.vitepress/theme/contribution-data.json');

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
}

// --- Main Function (fetch public SVG and parse) ---
async function fetchAndSaveContributionsFromSvg() {
  console.log(`Fetching public contribution SVG for ${GITHUB_USERNAME}...`);
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    const html = await res.text();

    const dayCellRegex = /<td[^>]*?data-date="([^"]+)"[^>]*?data-level="([^"]+)"[\s\S]*?<tool-tip[^>]*?>\s*(\d+|No) contribution/g;
    const allDays: ContributionDay[] = [];
    let total = 0;
    let match;

    while ((match = dayCellRegex.exec(html)) !== null) {
      const dateStr = match[1];
      const levelRaw = match[2];
      const countStr = match[3];

      const count = countStr === 'No' ? 0 : parseInt(countStr, 10);

      const levelMap: Record<string, ContributionLevel> = {
        '0': 'NONE',
        '1': 'FIRST_QUARTILE',
        '2': 'SECOND_QUARTILE',
        '3': 'THIRD_QUARTILE',
        '4': 'FOURTH_QUARTILE',
      };
      const contributionLevel = (levelMap[levelRaw] || 'NONE') as ContributionLevel;
      const weekday = new Date(dateStr + 'T00:00:00Z').getUTCDay();

      allDays.push({
        contributionCount: count,
        date: dateStr,
        weekday,
        contributionLevel,
      });
      total += count;
    }

    // Sort all parsed days by date to ensure they are chronological
    allDays.sort((a, b) => a.date.localeCompare(b.date));

    if (allDays.length === 0) {
      throw new Error('Could not parse any contribution day cells from HTML. The structure from GitHub may have changed.');
    }

    const weeks: ContributionWeek[] = [];
    if (allDays.length > 0) {
      // Find the Sunday of the week of the very first contribution day
      const firstDate = new Date(allDays[0].date + 'T00:00:00Z');
      const firstSunday = new Date(firstDate);
      firstSunday.setUTCDate(firstDate.getUTCDate() - firstDate.getUTCDay());

      // Find the date of the last contribution day
      const lastDate = new Date(allDays[allDays.length - 1].date + 'T00:00:00Z');

      // Calculate the number of weeks (columns) to create
      const M_IN_A_DAY = 1000 * 60 * 60 * 24;
      const numWeeks = Math.ceil((lastDate.getTime() - firstSunday.getTime() + M_IN_A_DAY) / (M_IN_A_DAY * 7));

      // Initialize the weeks array with empty weeks
      for (let i = 0; i < numWeeks; i++) {
        weeks.push({contributionDays: []});
      }

      // Place each day into its correct week (column)
      allDays.forEach(day => {
        const dayDate = new Date(day.date + 'T00:00:00Z');
        const weekIndex = Math.floor((dayDate.getTime() - firstSunday.getTime()) / (M_IN_A_DAY * 7));
        if (weeks[weekIndex]) {
          weeks[weekIndex].contributionDays.push(day);
        }
      });

      // After grouping, ensure days within each week are sorted by weekday
      weeks.forEach(week => {
        week.contributionDays.sort((a, b) => a.weekday - b.weekday);
      });
    }

    const calendar: ContributionCalendar = {
      totalContributions: total,
      weeks,
    };

    // Ensure output dir exists
    const outputDir = join(process.cwd(), '.vitepress/theme');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, {recursive: true});
    }

    writeFileSync(OUTPUT_FILE, JSON.stringify(calendar, null, 2));
    console.log(`Saved contribution data to ${OUTPUT_FILE}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Failed to fetch/parse contribution SVG:', msg);
    writeFileSync(OUTPUT_FILE, JSON.stringify({error: msg}, null, 2));
    process.exit(1);
  }
}

fetchAndSaveContributionsFromSvg();

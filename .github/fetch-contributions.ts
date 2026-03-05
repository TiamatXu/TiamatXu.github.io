import fetch from 'node-fetch'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { format } from 'date-fns'

// --- Configuration ---
const GITHUB_USERNAME = 'TiamatXu' // <<< 请替换为您的 GitHub 用户名
const OUTPUT_FILE = join(process.cwd(), '.vitepress/theme/contribution-data.json')
const M_IN_A_DAY = 1000 * 60 * 60 * 24 // Constant for milliseconds in a day

// Mapping for contribution levels
const LEVEL_MAP: Record<string, ContributionLevel> = {
  '0': 'NONE',
  '1': 'FIRST_QUARTILE',
  '2': 'SECOND_QUARTILE',
  '3': 'THIRD_QUARTILE',
  '4': 'FOURTH_QUARTILE'
}

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
}

// --- Helper Functions ---

/**
 * Fetches HTML content from a given URL.
 * @param url The URL to fetch.
 * @returns The HTML content as a string.
 */
async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return res.text()
}

/**
 * Parses GitHub contributions HTML and extracts raw day data.
 * @param html The HTML content of the GitHub contributions page.
 * @returns An array of objects containing date, levelRaw, and countStr.
 */
function parseContributionHtml(html: string): Array<{ dateStr: string; levelRaw: string; countStr: string }> {
  const dayCellRegex =
    /<td[^>]*?data-date="([^"]+)"[^>]*?data-level="([^"]+)"[\s\S]*?<tool-tip[^>]*?>\s*(\d+|No) contribution/g
  const rawDays: Array<{ dateStr: string; levelRaw: string; countStr: string }> = []
  let match

  while ((match = dayCellRegex.exec(html)) !== null) {
    rawDays.push({
      dateStr: match[1],
      levelRaw: match[2],
      countStr: match[3]
    })
  }
  if (rawDays.length === 0) {
    throw new Error('Could not parse any contribution day cells from HTML. The structure from GitHub may have changed.')
  }
  return rawDays
}

/**
 * Transforms raw contribution data into an array of ContributionDay objects.
 * @param rawDays An array of raw day data from parsing.
 * @returns An array of ContributionDay objects.
 */
function transformRawDataToContributionDays(
  rawDays: Array<{ dateStr: string; levelRaw: string; countStr: string }>
): ContributionDay[] {
  return rawDays.map((rawDay) => {
    const count = rawDay.countStr === 'No' ? 0 : parseInt(rawDay.countStr, 10)
    const contributionLevel = (LEVEL_MAP[rawDay.levelRaw] || 'NONE') as ContributionLevel
    // Use getUTCDay to maintain consistency with original script's UTC weekday calculation
    const weekday = new Date(rawDay.dateStr + 'T00:00:00Z').getUTCDay()

    return {
      contributionCount: count,
      date: rawDay.dateStr,
      weekday,
      contributionLevel
    }
  })
}

/**
 * Adds a zero-contribution placeholder for the current day if not already present.
 * @param allDays The array of ContributionDay objects.
 */
function ensureCurrentDayPlaceholder(allDays: ContributionDay[]): void {
  const currentDate = new Date()
  const currentDateStr = format(currentDate, 'yyyy-MM-dd') // Corrected format
  // Use getUTCDay to maintain consistency with original script's UTC weekday calculation
  const currentWeekday = currentDate.getUTCDay()

  const lastDayInAllDays = allDays.length > 0 ? allDays[allDays.length - 1] : null

  if (!lastDayInAllDays || lastDayInAllDays.date !== currentDateStr) {
    allDays.push({
      contributionCount: 0,
      date: currentDateStr,
      weekday: currentWeekday,
      contributionLevel: 'NONE'
    })
  }
}

/**
 * Constructs the ContributionCalendar from an array of ContributionDay objects.
 * @param allDays The sorted array of ContributionDay objects.
 * @returns The constructed ContributionCalendar object.
 */
function buildContributionCalendar(allDays: ContributionDay[]): ContributionCalendar {
  const totalContributions = allDays.reduce((sum, day) => sum + day.contributionCount, 0)
  const weeks: ContributionWeek[] = []

  if (allDays.length > 0) {
    // Find the Sunday of the week of the very first contribution day
    const firstDate = new Date(allDays[0].date + 'T00:00:00Z') // Added 'T00:00:00Z'
    const firstSunday = new Date(firstDate)
    firstSunday.setUTCDate(firstDate.getUTCDate() - firstDate.getUTCDay())

    // Find the date of the last contribution day
    const lastDate = new Date(allDays[allDays.length - 1].date + 'T00:00:00Z') // Added 'T00:00:00Z'

    // Calculate the number of weeks (columns) to create
    const numWeeks = Math.ceil((lastDate.getTime() - firstSunday.getTime() + M_IN_A_DAY) / (M_IN_A_DAY * 7))

    // Initialize the weeks array with empty weeks
    for (let i = 0; i < numWeeks; i++) {
      weeks.push({ contributionDays: [] })
    }

    // Place each day into its correct week (column)
    allDays.forEach((day) => {
      const dayDate = new Date(day.date + 'T00:00:00Z') // Added 'T00:00:00Z'
      const weekIndex = Math.floor((dayDate.getTime() - firstSunday.getTime()) / (M_IN_A_DAY * 7))
      if (weeks[weekIndex]) {
        weeks[weekIndex].contributionDays.push(day)
      }
    })

    // After grouping, ensure days within each week are sorted by weekday
    weeks.forEach((week) => {
      week.contributionDays.sort((a, b) => a.weekday - b.weekday)
    })
  }

  return {
    totalContributions,
    weeks
  }
}

/**
 * Ensures the output directory exists and writes the data to a JSON file.
 * @param data The data to write.
 * @param filePath The path to the output file.
 */
function writeJsonToFile(data: any, filePath: string): void {
  const outputDir = join(filePath, '..') // Get directory from file path
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// --- Main Function ---
async function fetchAndSaveGithubContributions() {
  console.log(`Fetching public contribution data for ${GITHUB_USERNAME}...`)
  try {
    const html = await fetchHtml(`https://github.com/users/${GITHUB_USERNAME}/contributions`)
    let allDays = transformRawDataToContributionDays(parseContributionHtml(html))

    allDays.sort((a, b) => a.date.localeCompare(b.date))
    ensureCurrentDayPlaceholder(allDays)

    const calendar = buildContributionCalendar(allDays)

    writeJsonToFile(calendar, OUTPUT_FILE)
    console.log(`Saved contribution data to ${OUTPUT_FILE}`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Failed to fetch/parse contribution data:', msg)
    writeJsonToFile({ error: msg }, OUTPUT_FILE) // Use the helper for error output too
    process.exit(1)
  }
}

fetchAndSaveGithubContributions().catch(() => {});

import fetch from 'node-fetch';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// --- Configuration ---
const GITHUB_USERNAME = 'TiamatXu'; // <<< 请替换为您的 GitHub 用户名
const OUTPUT_FILE = join(process.cwd(), '.vitepress/theme/contribution-data.json');

// --- GitHub GraphQL Query ---
const GITHUB_GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

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

interface UserContributions {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
  };
}

interface GraphQLResponse {
  data?: {
    user: UserContributions;
  };
  errors?: { message: string }[];
}

// --- Main Function ---
async function fetchAndSaveContributions() {
  const githubToken = process.env.CONTRIBUTIONS_TOKEN;

  if (!githubToken) {
    console.error('Error: GITHUB_PAT environment variable is not set.');
    console.error('Please set it with a GitHub Personal Access Token (PAT) with "read:user" scope.');
    writeFileSync(OUTPUT_FILE, JSON.stringify({ error: 'GITHUB_PAT not set' }, null, 2));
    process.exit(1);
  }

  console.log(`Fetching contribution data for ${GITHUB_USERNAME}...`);

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${githubToken}`,
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API responded with status ${response.status}: ${errorText}`);
    }

    const result: GraphQLResponse = await response.json();

    if (result.errors) {
      throw new Error(`GitHub API GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error('Could not retrieve contribution calendar from GitHub API response.');
    }

    // Ensure the output directory exists
    const outputDir = join(process.cwd(), '.vitepress/theme');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(OUTPUT_FILE, JSON.stringify(calendar, null, 2));
    console.log(`Successfully fetched and saved contribution data to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Failed to fetch or save contribution data:', error);
    // Write an error state to the file so the frontend can handle it gracefully
    writeFileSync(OUTPUT_FILE, JSON.stringify({ error: error instanceof Error ? error.message : String(error) }, null, 2));
    process.exit(1);
  }
}

fetchAndSaveContributions();

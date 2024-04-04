import { getToken } from "@/utils/accessToken"
import { GitHubIssueList } from "@/types/GitHubIssue"


export async function fetchGitHubIssues(): Promise<GitHubIssueList> {
  const accessToken = getToken();
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching issues: ${response.statusText}`);
  }

  const issues: GitHubIssueList = await response.json();
  return issues;
}

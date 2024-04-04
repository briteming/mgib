export type GitHubIssue = {
  id: number;
  node_id: string;
  url: string;
  title: string;
  body: string;
  user: {
    login: string;
    id: number;
    avatar_url: string;
  };
  labels: Array<{
    id: number;
    name: string;
    description: string;
    color: string;
  }>;
  state: string;
};

export type GitHubIssueList = GitHubIssue[];
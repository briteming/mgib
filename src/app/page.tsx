"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import { fetchGitHubIssues } from "@/utils/issue";
import { GitHubIssueList } from "@/types/GitHubIssue"

export default function Home() {
  const [issues, setIssues] = useState<GitHubIssueList | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGitHubIssues()
      .then(issues => {
        console.log(issues);
        setIssues(issues); // 保存获取到的issues
      })
      .catch(error => {
        console.error(error);
        setError(error.toString()); // 保存错误信息
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description} onClick={() => console.log(issues)}>
        Home Page
      </div>
      <div>
        {issues?.map((issue) => (
          <div key={issue.id}>{issue.title}</div>
        ))}
        {error && <p>Error loading issues: {error}</p>}
      </div>
    </main>
  );
}

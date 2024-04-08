import React, { useState, useEffect, useCallback } from "react";
import { VStack, Box, Spinner, Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

import IssueShortCard from "@/components/IssueShortCard";
import { Issue } from "@/types/Issue";
import { fetchIssues } from "@/api/issue";
import { getAccessToken } from "@/utils/githubToken";

/**
 * Component for displaying a list of GitHub issues with infinite scrolling.
 */
const InfiniteIssuesList = () => {
  const pageSize = 10; // Number of issues to fetch per request
  const token = getAccessToken(); // Authentication token for GitHub API
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to check if more issues are available to fetch
  const { ref, inView } = useInView(); // Intersection Observer hook to detect when the user has scrolled to the bottom

  /**
   * Loads more issues from the GitHub API.
   */
  const loadMoreIssues = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newIssues = await fetchIssues(token, page, pageSize);
    setIssues(prev => [...prev, ...newIssues]);
    setPage(prev => prev + 1);
    setLoading(false);

    if (newIssues.length < pageSize) setHasMore(false); // If less than pageSize issues are returned, there are no more issues to fetch
  }, [page, loading, hasMore, token]);

  /**
   * Reloads the issue list starting from the first page.
   */
  const reloadIssues = async () => {
    setLoading(true);
    const newIssues = await fetchIssues(token, 1, pageSize);
    setIssues(newIssues);
    setPage(2); // Set next page to load after reload
    setLoading(false);
    setHasMore(newIssues.length === pageSize); // Check if there might be more issues to load
  };

  // Load more issues when the bottom of the list is in view
  useEffect(() => {
    if (hasMore && inView) loadMoreIssues();
  }, [inView, loadMoreIssues]);

  return (
    <VStack spacing="16px" padding="32px">
      {/* Issue Cards */}
      {issues.map(issue => (
        <IssueShortCard key={issue.id} issue={issue} reloadIssues={reloadIssues} />
      ))}
      {/* Loader or End of List Text */}
      <Box ref={ref}>
        {hasMore ? loading && <Spinner /> : <Text>No more issues</Text>}
      </Box>
    </VStack>
  );
};

export default InfiniteIssuesList;

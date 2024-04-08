import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, 
  ModalCloseButton, Button, Spinner, Divider
} from '@chakra-ui/react';

import { Issue } from "@/types/Issue";
import { Comment } from '@/types/comment';
import { fetchComments } from '@/api/comment';
import { getAccessToken } from "@/utils/githubToken";
import EditableIssueCard from '../EditableIssueCard';
import CommentCard from '../CommentCard';

interface IssueModalProps {
  issue: Issue;
  isOpen: boolean;
  onClose: () => void;
  onIssueReload: () => void;
}

/**
 * Modal component to display and interact with an issue and its comments.
 */
const IssueModal: React.FC<IssueModalProps> = ({ issue, isOpen, onClose, onIssueReload }) => {
  const token = getAccessToken();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  // Callback function to load comments for the issue
  const loadComments = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const newComments = await fetchComments(token, issue.number);
    setComments(newComments);
    setLoading(false);
  }, [issue.number, loading, token]);

  // Effect hook to load comments when the modal is opened
  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Displaying the issue card */}
          <EditableIssueCard issue={issue} reloadIssues={onIssueReload} closeModal={onClose} />
          {/* Comments Section */}
          {loading ? (
            <Spinner />
          ) : (
            comments.map(comment => (
              <React.Fragment key={comment.id}>
                <Divider my="4" />
                <CommentCard comment={comment} />
              </React.Fragment>
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IssueModal;

import React, { useState } from 'react';
import {
  Button, Text, Box, Flex, Stack, Link, useColorModeValue, 
  HStack, Image, Divider, Tag, Input, Textarea, useToast
} from '@chakra-ui/react';
import { Remarkable } from 'remarkable';
import { useSession } from "next-auth/react";

import { Issue } from "@/types/Issue";
import { updateIssue, closeIssue } from '@/api/issue';
import { formatDate } from "@/utils/stringUtils";
import { reactionsIcons } from '@/utils/iconUtils';
import { getAccessToken } from "@/utils/githubToken";

interface EditableIssueCardProps {
  issue: Issue;
  reloadIssues: () => void; // Function to reload the list of issues on parent component
  closeModal: () => void; // Function to close the modal
}

/**
 * EditableIssueCard Component - Displays issue details allowing edit and delete for authorized users.
 */
const EditableIssueCard = ({ issue, reloadIssues, closeModal }: EditableIssueCardProps) => {
  const md = new Remarkable(); // Markdown parser
  const token = getAccessToken(); // GitHub API token
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [editedTitle, setEditedTitle] = useState(issue.title); // Edited title state
  const [editedBody, setEditedBody] = useState(issue.body); // Edited body state
  const toast = useToast(); // Toast for notifications
  const { data: session } = useSession();

  /**
   * handleEdit - Handles the issue update process.
   */
  const handleEdit = () => {
    if(!editedTitle || editedBody.length < 30) {
      // Validation for title and body
      toast({
        title: 'Failed!',
        description: 'Title cannot be empty and content must be at least 30 characters.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    updateIssue(token, issue.number, editedTitle, editedBody) // API call to update the issue
      .then(() => {
        toast({ 
          title: 'Success!', 
          description: 'Issue updated successfully.', 
          status: 'success', 
          duration: 5000, 
          isClosable: true, 
        });
        reloadIssues(); // Reload the issues list in the parent component
        closeModal(); // Close the modal
      })
      .catch(error => {
        toast({ 
          title: 'Failed!', 
          description: error.message, 
          status: 'error', 
          duration: 5000, 
          isClosable: true, 
        });
      });
  };

  /**
   * handleDelete - Handles the issue deletion process.
   */
  const handleDelete = () => {
    closeIssue(token, issue.number) // API call to close/delete the issue
      .then(() => {
        toast({ 
          title: 'Success!', 
          description: 'Issue deleted successfully.', 
          status: 'success', 
          duration: 5000, 
          isClosable: true, 
        });
        reloadIssues(); // Reload the issues list in the parent component
        closeModal(); // Close the modal
      })
      .catch(error => {
        toast({ 
          title: 'Failed!', 
          description: error.message, 
          status: 'error', 
          duration: 5000, 
          isClosable: true, 
        });
      });
  };

  return (
    <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%" gap="12px"
      p={4} bg={useColorModeValue("white", "gray.700")} justify='space-between'>
      {/* Issue Details */}
      <Stack justify="space-between" flexGrow='1'>
        <Box>
          {editMode ? (
            <>
              <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} size="lg" fontWeight="bold" w='100%' />
              <Textarea value={editedBody} onChange={(e) => setEditedBody(e.target.value)} mt={2} height="150px" flexGrow='1' />
            </>
          ) : (
            <>
              <Link fontSize="24px" fontWeight="bold" href={issue.url} isExternal>
                {issue.title} <Text as="span" fontSize="18px" color="gray.500">#{issue.number}</Text>
              </Link>
              <Text flexGrow='1' mt={2} noOfLines={4} minH="80px" overflow="hidden" dangerouslySetInnerHTML={{__html: md.render(issue.body)}} />
            </>
          )}
        </Box>
        {/* Reactions Display */}
        <HStack justifySelf="start">
          {Object.entries(issue.reactions).map(([key, value]) => reactionsIcons[key] && value > 0 ? 
            <Flex key={key} gap='4px' align='center' padding='2px 4px' border='1px' borderRadius='2px' shadow="md">
              {reactionsIcons[key]} {value}
            </Flex> : null
          )}
        </HStack>
      </Stack>
      {/* Issue Metadata and Actions */}
      <Stack w='200px' justifySelf='start'>
        {session && session.user.name === process.env.NEXT_PUBLIC_GITHUB_OWNER && (
          <Flex gap='12px' justify='end'>
            {editMode ? (
              <>
                <Button colorScheme="green" onClick={handleEdit}>Save</Button>
                <Button colorScheme="red" onClick={() => setEditMode(false)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button colorScheme="green" onClick={() => setEditMode(true)}>Edit</Button>
                <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
              </>
            )}
          </Flex>
        )}
        {/* Issue User and Timestamps */}
        <Stack w='200px'>
          <Text>User:</Text>
          <Flex gap='10px'>
            <Image borderRadius='full' boxSize='24px' src={issue.user.avatar_url} alt={`Profile Picture for ${issue.user.name}`} />
            <Text>{issue.user.name}</Text>
          </Flex>
          <Divider />
        </Stack>
        <Stack>
          <Text>Label:</Text>
          <Flex flexWrap="wrap">
            {issue.labels.map(label => (
              <Tag key={label.id} ml={2} mt={2} minW='fit-content' whiteSpace='nowrap' color="white" bg={`#${label.color}`}>
                {label.name}
              </Tag>
            ))}
          </Flex>
          <Divider />
        </Stack>
        <Stack>
          <Text>Updated Time:</Text>
          <Text>{formatDate(issue.updated_at)}</Text>
        </Stack>
        <Stack>
          <Text>Created Time:</Text>
          <Text>{formatDate(issue.created_at)}</Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default EditableIssueCard;

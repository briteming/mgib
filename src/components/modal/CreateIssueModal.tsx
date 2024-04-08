import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, 
  ModalCloseButton, Button, useColorModeValue, Text, Box, Flex, Stack,
  Input, Textarea, useToast
} from '@chakra-ui/react';
import { createIssue } from '@/api/issue';
import { getAccessToken } from "@/utils/githubToken"; 

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component for creating a new GitHub issue.
 * @param {boolean} props.isOpen Controls the visibility of the modal
 * @param {Function} props.onClose Function to call when closing the modal
 */
const CreateIssueModal: React.FC<IssueModalProps> = ({ isOpen, onClose }) => {
  const token = getAccessToken();
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const toast = useToast();

  /**
   * Handles the creation of a new issue.
   * Validates title and body before sending the request.
   */
  const handleCreate = () => {
    if (!editedTitle) {
      toast({
        title: 'Failed!',
        description: 'Title cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (editedBody.length < 30) {
      toast({
        title: 'Failed!',
        description: 'Content must be at least 30 characters.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    createIssue(token, editedTitle, editedBody)
      .then(res => {
        toast({
          title: 'Success!',
          description: res.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
        setTimeout(() => location.reload(), 1000);
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
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent>
        {/* Modal Header */}
        <ModalHeader>Create a New Issue</ModalHeader>
        <ModalCloseButton />
        
        {/* Modal Body */}
        <ModalBody>
          <Flex
            borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%"
            p={4} bg={useColorModeValue("white", "gray.700")}
            justify='space-between'>
            <Stack justify="space-between" flexGrow='1'>
              {/* Issue Title Input */}
              <Box>
                <Text fontSize='18px'>Title:</Text>
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  size="lg"
                  fontWeight="bold"
                  w='100%'
                />
              </Box>
              
              {/* Issue Content Textarea */}
              <Box>
                <Text fontSize='18px'>Content:</Text>
                <Textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  mt={2}
                  height="150px"
                  flexGrow='1'
                />
              </Box>
            </Stack>
          </Flex>
        </ModalBody>
        
        {/* Modal Footer */}
        <ModalFooter>
          <Flex gap='12px'>
            <Button colorScheme="green" onClick={handleCreate}>Create</Button>
            <Button colorScheme="red" onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateIssueModal;

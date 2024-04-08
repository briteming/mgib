import React from 'react';
import {
  Flex, Stack, Box, Text, HStack, Image, Divider, Link, useColorModeValue
} from '@chakra-ui/react';
import { Remarkable } from 'remarkable';

import { Comment } from '@/types/comment';
import { reactionsIcons } from '@/utils/iconUtils';
import { formatDate } from "@/utils/stringUtils";

interface CommentCardProps {
  comment: Comment;
}

/**
 * Renders a single comment card with user, content, reactions, and timestamps.
 * @param {Comment} props.comment - The comment data to display.
 */
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const md = new Remarkable();

  return (
    <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%"
      gap="12px" p={4} bg={useColorModeValue("white", "gray.700")} justify='space-between'
    >
      {/* Comment Content */}
      <Stack justify="space-between" flexGrow='1'>
        <Box>
          <Link display='block' fontSize="18px" color="gray.500" href={comment.url} isExternal>
            [Comment#{comment.id}]
          </Link>
          {/* Render comment body with markdown support */}
          <Text dangerouslySetInnerHTML={{ __html: md.render(comment.body) }}
            mt={2} noOfLines={4} minH="80px"
          />
        </Box>

        {/* Comment Reactions */}
        <HStack justifySelf="start">
          {Object.entries(comment.reactions).map(([key, value]) => (
            reactionsIcons[key] && value > 0 ?
              <Flex key={key} gap='4px' align='center' padding='2px 4px'
                border='1px' borderRadius='2px' shadow="md"
              >
                {reactionsIcons[key]} {value}
              </Flex> : null
          ))}
        </HStack>
      </Stack>

      {/* User Information and Timestamps */}
      <Stack w='200px' justifySelf='start'>
        <Box>
          <Text>User:</Text>
          <Flex gap='10px'>
            <Image borderRadius='full' boxSize='24px'
              src={comment.user.avatar_url} alt={`Profile Picture for ${comment.user.name}`}
            />
            <Text>{comment.user.name}</Text>
          </Flex>
          <Divider color='black' />
        </Box>
        <Box>
          <Text>Updated Time:</Text>
          <Flex>{formatDate(comment.updated_at)}</Flex>
          <Divider color='black' />
        </Box>
        <Box>
          <Text>Created Time:</Text>
          <Flex>{formatDate(comment.created_at)}</Flex>
          <Divider color='black' />
        </Box>
      </Stack>
    </Flex>
  );
};

export default CommentCard;

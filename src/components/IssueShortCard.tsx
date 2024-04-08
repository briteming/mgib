import React from "react";
import { Box, Text, Flex, HStack, Tag, useColorModeValue, Link, useDisclosure } from "@chakra-ui/react";
import { Remarkable } from 'remarkable';

import IssueModal from "./modal/IssueModal"; // Ensure the path matches your file structure
import { Issue } from "@/types/Issue"; // Adjust the import path as needed
import { formatDate, truncate } from "@/utils/stringUtils"; // Adjust the import path as needed
import { reactionsIcons } from '@/utils/iconUtils'; // Adjust the import path as needed

/**
 * Card component for displaying a single GitHub issue.
 * 
 * @param {Issue} issue - The issue to display.
 * @param {Function} reloadIssues - Function to reload the list of issues.
 */
const IssueShortCard = ({ issue, reloadIssues }: { issue: Issue, reloadIssues: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const md = new Remarkable();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%" cursor="pointer"
        p={4} bg={useColorModeValue("white", "gray.700")} onClick={onOpen}>
      {/* Issue Title and Number */}
      <Flex justify="space-between" align="center">
        <Link fontSize="24px" fontWeight="bold" href={issue.url} isExternal>
          {issue.title} <Text as="span" fontSize="18px" color="gray.500">#{issue.number}</Text>
        </Link>
        {/* Labels */}
        <HStack>
          {issue.labels.map(label => (
            <Tag key={label.id} ml={2} color="white" bg={`#${label.color}`}>
              {label.name}
            </Tag>
          ))}
        </HStack>
      </Flex>
      {/* Truncated Issue Body with Markdown rendering */}
      <Text mt={2} noOfLines={4} height="80px" overflow="hidden"
          dangerouslySetInnerHTML={{__html: md.render(truncate(issue.body, 200))}}
      />
      {/* Reactions and Updated Time */}
      <Flex mt={4} justify="space-between" alignItems="center">
        <HStack>
          {Object.entries(issue.reactions).map(([key, value]) => (
            reactionsIcons[key] && value > 0 ? 
            <Flex key={key} gap='4px' align='center' padding='2px 4px'
              border='1px' borderRadius='2px' shadow="md">
              {reactionsIcons[key]} {value}
            </Flex> : null
          ))}
        </HStack>
        <Text fontSize="sm">Updated at {formatDate(issue.updated_at)}</Text>
      </Flex>
      {/* Issue Detail Modal */}
      <IssueModal issue={issue} isOpen={isOpen} onClose={onClose} onIssueReload={reloadIssues} />
    </Box>
  );
};

export default IssueShortCard;

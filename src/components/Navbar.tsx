import React from 'react';
import { Box, Flex, Button, Image, Link, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { signIn, signOut, useSession } from "next-auth/react";
import CreateIssueModal from "@/components/modal/CreateIssueModal";

/**
 * Navbar component - Displays the navigation bar with login/logout functionality and an option to create new posts for authorized users.
 */
const Navbar = () => {
  const { data: session } = useSession(); // Access session data to check user authentication status
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('blue.500', 'gray.800');
  const color = useColorModeValue('white', 'gray.200'); 

  return (
    <React.Fragment>
      {/* Navbar Container */}
      <Box bg={bg} color={color} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* Brand/Logo Section */}
          <Box>
            <Link href="/" _hover={{ textDecoration: 'none' }} fontWeight="bold">
              Github Issue Blog
            </Link>
          </Box>

          {/* Authentication Section */}
          <Flex alignItems={'center'}>
            {!session ? (
              // Login Button
              <Button onClick={() => signIn("github")} colorScheme="teal" size="sm">
                Login With GitHub
              </Button>
            ) : (
              // User Info & Logout Button
              <Flex gap={2} align="center">
                {session.user.name === process.env.NEXT_PUBLIC_GITHUB_OWNER && (
                  <Button colorScheme="green" size="sm" onClick={onOpen}>
                    Create Post
                  </Button>
                )}
                <Image
                  borderRadius='full'
                  boxSize='40px'
                  src={session.user.image || ''}
                  alt={`Profile Picture for ${session.user.name}`}
                />
                <Button onClick={() => signOut({ callbackUrl: "/" })} colorScheme="red" size="sm">
                  Logout
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Create Issue Modal */}
      <CreateIssueModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};

export default Navbar;

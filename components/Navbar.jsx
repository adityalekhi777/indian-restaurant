'use client';

import { Box, Flex, Spacer, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function Navbar() {
  const isAuthenticated = true;

  return (
    <Box bg='blue.500' px={4} py={3}>
      <Flex alignItems='center'>
        <Link href='/' passHref>
          <Text fontSize='xl' fontWeight='bold' color='white' cursor='pointer'>
            Desi Taste
          </Text>
        </Link>
        <Spacer />
        <Box>
          <Link href='/' passHref>
            <Button as='a' variant='ghost' color='white' mr={2}>
              Home
            </Button>
          </Link>
          <Link href='/cart' passHref>
            <Button as='a' variant='ghost' color='white' mr={2}>
              Cart
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button variant='outline' color='white'>
              Logout
            </Button>
          ) : (
            <Link href='/login' passHref>
              <Button as='a' variant='outline' color='white'>
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

"use client"

import { Box, Flex, Spacer, Button, Text } from "@chakra-ui/react"
import NextLink from "next/link"

export default function Navbar() {
 
  let isAuthenticated = true;

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <NextLink href="/" passHref>
          <Text fontSize="xl" fontWeight="bold" color="white" cursor="pointer">
            Desi Taste
          </Text>
        </NextLink>
        <Spacer />
        <Box>
          <Button as={NextLink} href="/" variant="ghost" color="white" mr={2}>
            Home
          </Button>
          {isAuthenticated && (
            <Button as={NextLink} href="/cart" variant="ghost" color="white" mr={2}>
              Cart
            </Button>
          )}
          {isAuthenticated ? (
            <Button  variant="outline" color="white">
              Logout
            </Button>
          ) : (
            <Button as={NextLink} href="/login" variant="outline" color="white">
              Login
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  )
}


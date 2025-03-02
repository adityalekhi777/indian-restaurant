"use client"

import { useSelector } from "react-redux"
import { Box, Heading, Text, VStack } from "@chakra-ui/react"

export default function Profile() {
  const user = useSelector((state) => state.auth.user)

  if (!user) {
    return <Box>Please log in to view your profile.</Box>
  }

  return (
    <Box maxWidth="600px" margin="auto" mt={8} px={4}>
      <VStack spacing={4} align="stretch">
        <Heading>User Profile</Heading>
        <Text>
          <strong>Email:</strong> {user.email}
        </Text>
      </VStack>
    </Box>
  )
}

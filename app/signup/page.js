"use client"

import React from "react"
import { useDispatch } from "react-redux"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { setUser } from "../../lib/slices/authSlice"
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function Signup() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const dispatch = useDispatch()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      dispatch(setUser({ uid: userCredential.user.uid, email: userCredential.user.email }))
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8} px={4}>
      <VStack spacing={4} as="form" onSubmit={handleSignup}>
        <Heading>Sign up for Desi Taste</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Sign Up
        </Button>
        <Text>
          Already have an account? <Link href="/login">Login</Link>
        </Text>
      </VStack>
    </Box>
  )
}


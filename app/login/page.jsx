"use client"

import React from "react"
import { useDispatch } from "react-redux"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { setUser } from "../../lib/slices/authSlice"
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"; 

export default function Login() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const dispatch = useDispatch()
  const route = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      dispatch(setUser({ uid: userCredential.user.uid, email: userCredential.user.email }))
      route.push('/')
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8} px={4}>
      <VStack spacing={4} as="form" onSubmit={handleLogin}>
        <Heading>Login to Desi Taste</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Login
        </Button>
        <Text>
          Dont have an account? <Link href="/signup">Sign up</Link>
        </Text>
      </VStack>
    </Box>
  )
}


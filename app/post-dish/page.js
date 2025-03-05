"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Select,
  Image,
  useToast,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { db } from "../../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function PostDish() {
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()
  const toast = useToast()

  const [dishData, setDishData] = useState({
    name: "",
    description: "",
    ingredients: "",
    procedure: "",
    time: "",
    difficulty: "",
    video: "",
    imageUrl: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDishData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to post a dish.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // Process ingredients and procedure from text to arrays
      const ingredients = dishData.ingredients.split("\n").filter((item) => item.trim() !== "")
      const procedure = dishData.procedure.split("\n").filter((item) => item.trim() !== "")

      // Add dish to Firestore
      const dishRef = await addDoc(collection(db, "dishes"), {
        name: dishData.name,
        description: dishData.description,
        ingredients,
        procedure,
        time: dishData.time,
        difficulty: dishData.difficulty,
        video: dishData.video,
        image: dishData.imageUrl,
        postedBy: {
          uid: user.uid,
          email: user.email,
        },
        createdAt: serverTimestamp(),
      })

      toast({
        title: "Dish posted successfully!",
        description: "Your dish has been added to our collection.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      // Redirect to the dish page
      router.push(`/dish/${dishRef.id}`)
    } catch (error) {
      console.error("Error posting dish:", error)
      toast({
        title: "Error posting dish",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <Box textAlign="center" mt={8}>
        <Heading>Authentication Required</Heading>
        <Text mt={4}>Please log in to post a dish.</Text>
        <Button as={Link} href="/login" colorScheme="blue" mt={4}>
          Login
        </Button>
      </Box>
    )
  }

  return (
    <Box maxWidth="600px" margin="auto" mt={8} px={4} mb={8}>
      <Heading mb={6}>Post a New Dish</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Dish Name</FormLabel>
            <Input name="name" value={dishData.name} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={dishData.description} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Ingredients (one per line)</FormLabel>
            <Textarea
              name="ingredients"
              value={dishData.ingredients}
              onChange={handleChange}
              placeholder="Ingredient 1&#10;Ingredient 2&#10;Ingredient 3"
              minHeight="120px"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Procedure (one step per line)</FormLabel>
            <Textarea
              name="procedure"
              value={dishData.procedure}
              onChange={handleChange}
              placeholder="Step 1&#10;Step 2&#10;Step 3"
              minHeight="150px"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Cooking Time</FormLabel>
            <Input name="time" value={dishData.time} onChange={handleChange} placeholder="e.g., 30 minutes" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Difficulty</FormLabel>
            <Select name="difficulty" value={dishData.difficulty} onChange={handleChange}>
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Video URL (YouTube)</FormLabel>
            <Input
              name="video"
              value={dishData.video}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="imageUrl"
              value={dishData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
            {dishData.imageUrl && (
              <Box mt={2}>
                <Image
                  src={dishData.imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  maxHeight="200px"
                  fallbackSrc="/placeholder.svg?height=200&width=300"
                />
              </Box>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Posting...">
            Post Dish
          </Button>
        </VStack>
      </form>
    </Box>
  )
}


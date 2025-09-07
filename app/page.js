"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addDishToWatchList } from "../lib/slices/watchListSlice"
import { Box, Button, Grid, Heading, Text, VStack, Image, AspectRatio, Spinner, Center } from "@chakra-ui/react"
import Link from "next/link"
import { db } from "../firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

function DishCard({ dish, onAddToWatchList, userId }) {
  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden">
      <Link href={`/dish/${dish.id}`}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={dish.image || "/placeholder.svg?height=200&width=300"}
            alt={dish.name}
            objectFit="cover"
            fallbackSrc="/placeholder.svg?height=200&width=300"
          />
        </AspectRatio>
      </Link>
      <VStack align="start" p={4} spacing={2}>
        <Heading size="md">{dish.name}</Heading>
        <Text noOfLines={2}>{dish.description}</Text>
        <Button onClick={() => onAddToWatchList(userId, dish)} colorScheme="blue" width="100%" isDisabled={!userId}>
          Add to Watch List
        </Button>
      </VStack>
    </Box>
  )
}

export default function Home() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const q = query(collection(db, "dishes"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        const dishesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to regular date if needed
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
        }))
        setDishes(dishesData)
      } catch (error) {
        console.error("Error fetching dishes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDishes()
  }, [])

  const handleAddToWatchList = (userId, dish) => {
    if (userId) {
      dispatch(addDishToWatchList({ userId, dish }))
    }
  }

  // if (!isAuthenticated) {
  //   return (
  //     <Box textAlign="center" mt={8}>
  //       <Heading>Welcome to Desi Taste</Heading>
  //       <Text mt={4}>Please log in or sign up to explore delicious recipes.</Text>
  //       <Button as={Link} href="/login" colorScheme="blue" mt={4} mr={2}>
  //         Login
  //       </Button>
  //       <Button as={Link} href="/signup" colorScheme="green" mt={4}>
  //         Sign Up
  //       </Button>
  //     </Box>
  //   )
  // }

  if (loading) {
    return (
      <Center h="50vh">
        <VStack>
          <Spinner size="xl" />
          <Text mt={4}>Loading dishes...</Text>
        </VStack>
      </Center>
    )
  }

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} px={4} mb={8}>
      <Heading mb={6}>Desi Taste Recipes</Heading>
      {dishes.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl">No dishes found. Be the first to post a recipe!</Text>
          <Button as={Link} href="/post-dish" colorScheme="blue" mt={4}>
            Post a Dish
          </Button>
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} onAddToWatchList={handleAddToWatchList} userId={user?.uid} />
          ))}
        </Grid>
      )}
    </Box>
  )
}


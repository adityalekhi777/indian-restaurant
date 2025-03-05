"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchWatchList, removeDishFromWatchList } from "../../lib/slices/watchListSlice"
import { Box, Button, Grid, Heading, Text, VStack, Image, AspectRatio, Spinner, Center } from "@chakra-ui/react"
import Link from "next/link"

function DishCard({ dish, onRemoveFromWatchList, userId }) {
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
        <Button onClick={() => onRemoveFromWatchList(userId, dish.id)} colorScheme="red" width="100%">
          Remove from Watch List
        </Button>
      </VStack>
    </Box>
  )
}

export default function WatchList() {
  const watchList = useSelector((state) => state.watchList)
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchWatchList(user.uid)).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch, user])

  const handleRemoveFromWatchList = (userId, dishId) => {
    if (userId) {
      dispatch(removeDishFromWatchList({ userId, dishId }))
    }
  }

  if (!isAuthenticated) {
    return (
      <Box textAlign="center" mt={8}>
        <Heading>Authentication Required</Heading>
        <Text mt={4}>Please log in to view your watch list.</Text>
        <Button as={Link} href="/login" colorScheme="blue" mt={4}>
          Login
        </Button>
      </Box>
    )
  }

  if (loading) {
    return (
      <Center h="50vh">
        <VStack>
          <Spinner size="xl" />
          <Text mt={4}>Loading your watch list...</Text>
        </VStack>
      </Center>
    )
  }

  if (watchList.length === 0) {
    return (
      <Box textAlign="center" mt={8}>
        <Heading>Your watch list is empty</Heading>
        <Button as={Link} href="/" colorScheme="blue" mt={4}>
          Explore Recipes
        </Button>
      </Box>
    )
  }

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} px={4} mb={8}>
      <Heading mb={6}>Your Watch List</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {watchList.map((dish) => (
          <DishCard key={dish.id} dish={dish} onRemoveFromWatchList={handleRemoveFromWatchList} userId={user?.uid} />
        ))}
      </Grid>
    </Box>
  )
}


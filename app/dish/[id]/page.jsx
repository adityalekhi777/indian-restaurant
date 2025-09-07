import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Badge,
  Flex,
  UnorderedList,
  OrderedList,
  ListItem,
  Center,
} from "@chakra-ui/react"
import { db } from "./../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { notFound } from "next/navigation"

async function getDish(id) {
  const docRef = doc(db, "dishes", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      // Convert Firestore Timestamp to regular date if needed
      createdAt: docSnap.data().createdAt ? docSnap.data().createdAt.toDate() : new Date(),
    }
  } else {
    return null
  }
}

export default async function DishDetails({ params }) {
  const dish = await getDish(params.id)
  if (!dish) {
    notFound() // This will render the not-found.js page
    return (
      <Box textAlign="center" mt={8}>
        <Heading>Error</Heading>
        <Text mt={4}>{error || "Dish not found"}</Text>
      </Box>
    )
  }
  return (
    <Box maxWidth="800px" margin="auto" mt={8} px={4} mb={8}>
      <VStack spacing={6} align="stretch">
        <Image
          src={dish.image || "/placeholder.svg?height=400&width=800"}
          alt={dish.name}
          width="100%"
          objectFit="cover"
          fallbackSrc="/placeholder.svg?height=400&width=800"
        />
        <Heading>{dish.name}</Heading>
        <Text fontSize="xl">{dish.description}</Text>
        <Flex>
          <Badge colorScheme="blue" mr={2}>
            {dish.time}
          </Badge>
          <Badge colorScheme="green">Difficulty: {dish.difficulty}</Badge>
        </Flex>
        <Box>
          <Heading size="md" mb={2}>
            Ingredients
          </Heading>
          <UnorderedList>
            {dish.ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box>
          <Heading size="md" mb={2}>
            Procedure
          </Heading>
          <OrderedList>
            {dish.procedure.map((step, index) => (
              <ListItem key={index}>{step}</ListItem>
            ))}
          </OrderedList>
        </Box>
        {dish.video && (
          <Box>
            <Heading size="md" mb={2}>
              Video Tutorial
            </Heading>
            <iframe
              width="100%"
              height="315"
              src={dish.video.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        )}
        <Text fontStyle="italic">Posted by: {dish.postedBy?.email || "Unknown"}</Text>
      </VStack>
    </Box>
  )
}

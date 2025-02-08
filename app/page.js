"use client"

import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../lib/slices/cartSlice"
import { Box, Button, Grid, Heading, Text, VStack, Image } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

// Dummy data for dishes
let imgUrl = "https://plus.unsplash.com/premium_photo-1692776206795-60a58a4dc817?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const dummyDishes = [
  {
    id: "2",
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a spinach gravy",
    price: 120,
    image: imgUrl,
  },
  {
    id: "3",
    name: "Vegetable Biryani",
    description: "Fragrant rice dish with mixed vegetables",
    price: 110,
    image: imgUrl,
  },
  {
    id: "5",
    name: "Naan",
    description: "Soft, leavened flatbread with mixed vegetables",
    price: 290,
    image: imgUrl,
  },
  {
    id: "6",
    name: "Mango Lassi",
    description: "Refreshing yogurt-based mango drink",
    price: 30,
    image: imgUrl, 
  },
]

export default function Home() {
  const dispatch = useDispatch()

  


  return (
    <Box maxWidth="1200px" margin="auto" mt={8} px={4}>
      <Heading mb={6}>Desi Taste Menu</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {dummyDishes.map((dish) => (
          <Box key={dish.id} borderWidth={1} borderRadius="lg" overflow="hidden">
            <Image
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <VStack align="stretch" p={4} spacing={2}>
              <Heading size="md">{dish.name}</Heading>
              <Text>{dish.description}</Text>
              <Text fontWeight="bold">{dish.price.toFixed(2)}</Text>
              <Button  colorScheme="blue" width="100%">
                Add to Cart
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}


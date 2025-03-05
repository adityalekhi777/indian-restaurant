import { useSelector, useDispatch } from "react-redux"
import { Box, Flex, Spacer, Button, Text } from "@chakra-ui/react"
import Link from "next/link"
import { clearUser } from "../lib/slices/authSlice"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <Link href="/" passHref>
          <Text fontSize="xl" fontWeight="bold" color="white" cursor="pointer">
            Desi Taste
          </Text>
        </Link>
        <Spacer />
        <Box>
          <Link href="/" passHref>
            <Button as="span" variant="ghost" color="white" mr={2}>
              Home
            </Button>
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/watchlist" passHref>
                <Button as="span" variant="ghost" color="white" mr={2}>
                  Watch List
                </Button>
              </Link>
              <Link href="/profile" passHref>
                <Button as="span" variant="ghost" color="white" mr={2}>
                  Profile
                </Button>
              </Link>
              <Link href="/post-dish" passHref>
                <Button as="span" variant="ghost" color="white" mr={2}>
                  Post Dish
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="outline" color="white">
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button as="span" variant="outline" color="white">
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  )
}


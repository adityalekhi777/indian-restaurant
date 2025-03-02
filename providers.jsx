"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from "./store"
import Navbar from "./components/Navbar"

export default function Providers({ children }) {
    return (
      <Provider store={store}>
        <ChakraProvider>
          <Navbar />
          {children}
        </ChakraProvider>
      </Provider>
    )
  }
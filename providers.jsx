"use client"

import { useEffect } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from "./store"
import { initializeAuth } from "./lib/slices/authSlice"
import { fetchWatchList } from "./lib/slices/watchListSlice"
import Navbar from "./components/Navbar"

export default function Providers({ children }) {
  useEffect(() => {
    // Initialize authentication
    store.dispatch(initializeAuth()).then(() => {
      // After auth is initialized, fetch the watch list if user is logged in
      const state = store.getState()
      if (state.auth.user?.uid) {
        store.dispatch(fetchWatchList(state.auth.user.uid))
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Navbar />
        {children}
      </ChakraProvider>
    </Provider>
  )
}


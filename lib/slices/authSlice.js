import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { auth } from "../../firebase"
import { onAuthStateChanged } from "firebase/auth"

// Async thunk to initialize auth state
export const initializeAuth = createAsyncThunk("auth/initializeAuth", async (_, { dispatch }) => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          }),
        )
      } else {
        dispatch(clearUser())
      }
      resolve()
      unsubscribe()
    })
  })
})

const initialState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer


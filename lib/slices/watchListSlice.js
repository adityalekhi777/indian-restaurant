import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { db } from "../../firebase"
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"

// Async thunk to fetch a user's watch list
export const fetchWatchList = createAsyncThunk("watchList/fetchWatchList", async (userId, { rejectWithValue }) => {
  try {
    const docRef = doc(db, "watchlists", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data().dishes || []
    } else {
      // Create a new watch list document if it doesn't exist
      await setDoc(docRef, { dishes: [] })
      return []
    }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Async thunk to add a dish to the watch list
export const addDishToWatchList = createAsyncThunk(
  "watchList/addDishToWatchList",
  async ({ userId, dish }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "watchlists", userId)
      await updateDoc(docRef, {
        dishes: arrayUnion(dish),
      })
      return dish
    } catch (error) {
      // If the document doesn't exist yet, create it
      const docRef = doc(db, "watchlists", userId)
      if (error.code === "not-found") {
        try {
          await setDoc(docRef, {
            dishes: [dish],
          })
          return dish
        } catch (innerError) {
          return rejectWithValue(innerError.message)
        }
      }
      return rejectWithValue(error.message)
    }
  },
)

// Async thunk to remove a dish from the watch list
export const removeDishFromWatchList = createAsyncThunk(
  "watchList/removeDishFromWatchList",
  async ({ userId, dishId }, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const dish = state.watchList.find((d) => d.id === dishId)

      if (!dish) return rejectWithValue("Dish not found in watch list")

      const docRef = doc(db, "watchlists", userId)
      await updateDoc(docRef, {
        dishes: arrayRemove(dish),
      })

      return dishId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const watchListSlice = createSlice({
  name: "watchList",
  initialState: [],
  reducers: {
    clearWatchList: () => [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchList.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(addDishToWatchList.fulfilled, (state, action) => {
        if (!state.some((dish) => dish.id === action.payload.id)) {
          state.push(action.payload)
        }
      })
      .addCase(removeDishFromWatchList.fulfilled, (state, action) => {
        return state.filter((dish) => dish.id !== action.payload)
      })
  },
})

export const { clearWatchList } = watchListSlice.actions
export default watchListSlice.reducer

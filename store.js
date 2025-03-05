import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./lib/slices/cartSlice"
import authReducer from "./lib/slices/authSlice"
import  watchListReducer  from "./lib/slices/watchListSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    watchList: watchListReducer,
  },
})


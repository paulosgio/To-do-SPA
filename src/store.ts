import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./features/toDo/toDoSlice"
import authSlice from "./features/Auth/authSlice"

const store = configureStore({
    reducer: {
        toDo: toDoSlice,
        auth: authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./features/toDo/toDoSlice"

const store = configureStore({
    reducer: {
        toDo: toDoSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
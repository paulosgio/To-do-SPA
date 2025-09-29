import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';
import type { IToDo } from "../../interfaces/ToDoInterface";

const initialState: IToDo[] = JSON.parse(localStorage.getItem("tasks") || "[]")

const toDoSlice = createSlice({
    name: "toDo",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<IToDo>)=> {
            const taskWithId = {...action.payload, id: uuidv4()}
            state.push(taskWithId)
            localStorage.setItem("tasks", JSON.stringify(state))
        },
        removeTask: (state, action: PayloadAction<string>)=> {
            const index = state.findIndex(param => param.id === action.payload)
            if (index !== -1) {
                state.splice(index, 1)
                localStorage.setItem("tasks", JSON.stringify(state))
            }
        },
        editTask: (state, action: PayloadAction<IToDo>)=> {
            const index = state.findIndex(param => param.id === action.payload.id)
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload }
                localStorage.setItem("tasks", JSON.stringify(state))
            }
        }
    }
})

export const { addTask, removeTask, editTask } = toDoSlice.actions
export default toDoSlice.reducer
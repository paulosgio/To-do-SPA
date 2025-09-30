import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IAuth {
    isAuthenticated: boolean,
    token: string | null
}

const initialState: IAuth = {
    isAuthenticated: false,
    token: null 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>)=> {
            state.isAuthenticated = true
            state.token = action.payload
            localStorage.setItem("token", state.token)
        },
        loginFailed: (state)=> {
            state.isAuthenticated = false
            state.token = null
        }
    }
})

export const { loginFailed, loginSuccess } = authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            return { ...state, isAuthenticated: true }
        },
        removeAuth: (state, action) => {
            return { ...state, isAuthenticated: false }
        }
    }
})


export const { setAuth, removeAuth } = authSlice.actions
export default authSlice.reducer;
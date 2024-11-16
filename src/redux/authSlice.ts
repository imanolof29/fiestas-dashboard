import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    email: string | null
    error: string | null
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; email: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;;
        },
    }
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer
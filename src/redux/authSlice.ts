import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    email: string | null
    error: string | null
    permissions: { [key: string]: string[] }
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    error: null,
    permissions: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; email: string, permissions: { [key: string]: string[] } }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
            state.error = null
            state.permissions = action.payload.permissions
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;
            state.permissions = {}
        },
        registerSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; email: string, permissions: { [key: string]: string[] } }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
            state.error = null
            state.permissions = action.payload.permissions
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        refreshTokenSuccess: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.accessToken = action.payload.accessToken
        }
    }
})

export const { loginSuccess, loginFailure, logout, registerSuccess, registerFailure } = authSlice.actions

export default authSlice.reducer
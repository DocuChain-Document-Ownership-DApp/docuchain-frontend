// src/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    walletAddress: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    walletAddress: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setWalletAddress: (state, action: PayloadAction<string>) => {
            state.walletAddress = action.payload;
        },
        setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearAuthData: (state) => {
            state.walletAddress = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setWalletAddress, setTokens, setLoading, setError, clearAuthData } = authSlice.actions;
export default authSlice.reducer;

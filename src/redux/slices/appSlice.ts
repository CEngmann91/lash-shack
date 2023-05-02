import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showingAuthModal: false,
    loading: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        showAuthModal: (state) => {
            state.showingAuthModal = true;
        },
        hideAuthModal: (state) => {
            state.showingAuthModal = false;
        },
        setAsLoading: (state) => {
            state.loading = true;
        },
        setAsNotLoading: (state) => {
            state.loading = false;
        },
    }
});

export const appActions = appSlice.actions

export default appSlice.reducer
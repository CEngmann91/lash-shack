import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
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
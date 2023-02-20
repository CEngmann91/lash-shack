import { configureStore } from '@reduxjs/toolkit';
// Slices
import appSlice from './slices/appSlice';
import userSlice from './slices/userSlice';
import basketSlice from './slices/basketSlice';
import wishListSlice from './slices/wishListSlice';

const store = configureStore({
    reducer: {
        application: appSlice,
        userAccount: userSlice,
        basket: basketSlice,
        wishList: wishListSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
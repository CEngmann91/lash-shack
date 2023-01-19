import { createSlice } from '@reduxjs/toolkit'
import { UserProfile } from '../../types/UserProfile';

// const initialState = null as Nullable<UserProfile>;
const initialState = {
    user: {
        uid: '',
        active: false,
        displayName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        // subscribed: false,
    } as UserProfile,

    token: "",
    notificationCount: 1,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            // state.user = initialState.user;
            // state.token = "";

            return initialState;
        },
        setUID: (state, action) => {
            state.user.uid = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setFirstName: (state, action) => {
            state.user.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.user.lastName = action.payload;
        },
        setDisplayName: (state, action) => {
            state.user.displayName = action.payload;
        },
        setEmail: (state, action) => {
            state.user.email = action.payload;
        },
        setPhotoURL: (state, action) => {
            state.user.photoURL = action.payload;
        },
        // setSubscribedToEmails: (state, action) => {
        //     state.user.subscribed = action.payload;
        // },
        // unset() {
        //     return initialState;
        // }
    }
});

export const userActions = userSlice.actions

export default userSlice.reducer
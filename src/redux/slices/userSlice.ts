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
        memberSince: "",
        lastLoggedIn: "",
        // subscribed: false,
    } as UserProfile,
    authenticated: false,
    token: "",
    notificationCount: 0,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setAsAuthenticated: (state, action) => {
            state.authenticated = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            return initialState;
        },
        setAsActive: (state, action) => {
            state.user.active = action.payload;
        },
        setUID: (state, action) => {
            state.user.uid = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setAccountType: (state, action) => {
            state.user.account = action.payload;
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
        setBillingAddress: (state, action) => {
            state.user.billingAddress = action.payload;
        },
        setMemberSince: (state, action) => {
            state.user.memberSince = action.payload;
        },
        setLastLoggedIn: (state, action) => {
            state.user.lastLoggedIn = action.payload;
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
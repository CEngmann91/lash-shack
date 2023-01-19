import React from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../slices/userSlice';

export const useUserActions = () => {
    const dispatch = useDispatch();



    function setToken(token: string) {
        dispatch(userActions.setToken(token));
    }

    function setUID(uid: string) {
        dispatch(userActions.setUID(uid));
    }

    function setFullName(firstName: string, lastName: string) {
        dispatch(userActions.setFirstName(firstName));
        dispatch(userActions.setLastName(lastName));
    }

    function setEmail(email: string) {
        dispatch(userActions.setEmail(email));
    }

    function setProfile(displayName: string, photoURL: string) {
        setDisplayName(displayName);
        setProfilePhoto(photoURL);
    }

    function setDisplayName(displayName: string) {
        dispatch(userActions.setDisplayName(displayName));
    }

    function setProfilePhoto(photoURL: string) {
        dispatch(userActions.setPhotoURL(photoURL));
    }

    function logout() {
        dispatch(userActions.logout());
    }


    return {
        setToken, setUID, setFullName, setEmail, setProfile, setDisplayName, setProfilePhoto, logout
    };
}
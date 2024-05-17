import { useDispatch } from 'react-redux';
import { Address } from '../../types/Address';
import { AccountType } from '../../types/UserProfile';
import { userActions } from '../slices/userSlice';

export const useUserActions = () => {
    const dispatch = useDispatch();


    

    function setAsAuthenticated(isAuthenticated: boolean) {
        dispatch(userActions.setAsAuthenticated(isAuthenticated));
    }

    function setToken(token: string) {
        dispatch(userActions.setToken(token));
    }

    function setAsActive(isActive: boolean) {
        dispatch(userActions.setAsActive(isActive));
    }

    function setAccountType(type: AccountType) {
        dispatch(userActions.setAccountType(type));
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

    function setBillingAddress(address:Address) {
        dispatch(userActions.setBillingAddress(address));
    }

    function setLastLoggedIn(lastLoggedIn: string | undefined) {
        dispatch(userActions.setLastLoggedIn(lastLoggedIn));
    }

    function setMemberSince(memberSince: string | undefined) {
        dispatch(userActions.setMemberSince(memberSince));
    }

    function logout() {
        dispatch(userActions.logout());
    }


    return {
        setAsAuthenticated,
        setToken,
        setUID,
        setAsActive,
        setAccountType,
        setFullName,
        setEmail,
        setProfile,
        setDisplayName,
        setProfilePhoto,
        setBillingAddress,
        setLastLoggedIn,
        setMemberSince,
        logout
    };
}
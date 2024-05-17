import { useEffect } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { useSelector as useReduxSelector } from 'react-redux';

import { auth } from '../firebase/firebase';
import { useUserActions } from '../redux/hooks/useUserActions';
import { RootState } from '../redux/store';

export const useAuth = () => {
    const { logout, setAsAuthenticated, setToken, setUID, setDisplayName, setProfile, setEmail, setLastLoggedIn, setMemberSince } = useUserActions();
    const authenticated = useReduxSelector((state: RootState) => state.userAccount.authenticated);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setAsAuthenticated(!!user);

            if (user) {
                const idToken = await user.getIdToken();
                setToken(idToken);

                setUID(user.uid);
                setEmail(user.email as string);
                setDisplayName(user.displayName as string);

                setMemberSince(user.metadata?.creationTime);
                setLastLoggedIn(user.metadata?.lastSignInTime);
            }
            else {
                setToken("");
                logout();
            }
        })

        return function cleanup() {
            if (unsubscribe) unsubscribe();
        }
    }, [])


    return { authenticated }
}
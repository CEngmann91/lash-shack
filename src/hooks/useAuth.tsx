import { useEffect, useState } from 'react'

import { onAuthStateChanged, User } from 'firebase/auth'

import { auth } from '../firebase/firebase';
import { useUserActions } from '../redux/hooks/userActionsUtils';

export const useAuth = () => {
    const { logout, setToken, setUID, setProfile, setEmail } = useUserActions();
    const [currentUser, setCurrentUser] = useState<User | null>(null)





    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                // console.log(user);

                user.getIdToken()
                    .then(function (idToken) {
                        setToken(idToken);
                    });

                setUID(user.uid);
                setProfile(user.displayName as string, user.photoURL as string);
                setEmail(user.email as string);
                // console.log(user);
            }
            else {
                setCurrentUser(null)
                setToken("");
                logout();
            }
        })

    }, [])


    return { currentUser }
}
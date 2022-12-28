import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ReactNode, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { UserEntity, UserProfile } from "../helpers/firebase/data/UserProfile";
import { createUser, getCurrentUser, sendUserEmailVerification, signIntoUserAccount, signUserOut, updateUserDisplayName, updateUserPhotoURL } from "../helpers/firebase/Utils";

type AuthContextProviderProps = {
    children: ReactNode;
}
function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [error, setError] = useState<any>(null);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile>(new UserProfile({} as UserEntity));






    const isAuthenticated = (): boolean => getCurrentUser() !== null

    const signIn = async(email: string, password: string, onComplete: () => void) => {
        setError(null);
        setIsAuthenticating(true);

        await signIntoUserAccount(email, password,
            (user) => {
                setIsAuthenticating(false);

                setProfile(user);
                onComplete();
                // alert(JSON.stringify(user));
            },
            (errorCode, errorMessage) => {
                // alert(errorMessage.toString());
                // setProfile(undefined);
                setIsAuthenticating(false);
                setError(errorMessage);
            });
    }

    const updateDisplayName = async(display_name: string) => {
        setError(null);

        await updateUserDisplayName(profile, display_name,
            () => {
                // alert(JSON.stringify(user));
                // setProfile(prev => ({ ...prev, display_name: display_name }))
            },
            (errorCode, errorMessage) => {
                // alert(errorMessage.toString());
                setError(errorMessage);
            });
    }

    const updatePhotoURL = async(url: string) => {
        setError(null);

        await updateUserPhotoURL(url,
            () => {
                // alert("updated url");
                // setProfile(prev => ({ ...prev, photo_URL: url }))
            },
            (errorCode, errorMessage) => {
                alert(errorMessage);
                setError(errorMessage);
            });
    }

    const register = async(email: string, password: string) => {
        setError(null);
        setIsAuthenticating(true);

        await createUser(email, password,
            (user) => {
                // alert(user.toString());
                setIsAuthenticating(false);
                setProfile(user);
            },
            (errorCode, errorMessage) => {
                // alert(errorMessage.toString());
                setProfile(new UserProfile({} as UserEntity));
                setIsAuthenticating(false);
                setError(errorMessage);
            });
    }

    const signOut = async(onComplete: () => void) => {
        setError(null);

        await signUserOut(
            () => {
                // alert(user);
                setIsAuthenticating(false);
                setProfile(new UserProfile({} as UserEntity));
                onComplete();
            },
            (errorCode, errorMessage) => {
                // alert(errorMessage.toString());
                // setProfile(undefined);
                setIsAuthenticating(false);
                setError(errorMessage);
            });
    }

    const sendAuthEmailVerification = async() => {
        setError(null);

        await sendUserEmailVerification(
            () => {
            },
            (errorCode, errorMessage) => {
                // alert(errorMessage.toString());
                setError(errorMessage);
            });
    }

    const removeMyAccount = () => {
        setError(null);
        setIsAuthenticating(true);


    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            getAuth(),
            (user) => {
                if (!user) {
                    setAccessToken("");
                    setProfile(new UserProfile({} as UserEntity));
                    // console.log("signed out");
                    return;
                }
                const { photoURL, displayName } = user;
                setProfile(prev => ({ ...prev,
                    photo_URL: photoURL as string,
                    display_name: displayName as string,
                }))
                setAccessToken(user.uid);
            }
        );
        return () => unsubscribe()
    }, []);


    return (
        <AuthContext.Provider value={{
            profile,
            signIn,
            register,
            updateDisplayName,
            updatePhotoURL,
            sendAuthEmailVerification,
            removeMyAccount,
            signOut,
            isAuthenticating,
            isAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;


const useAuthContext = () => {
    return useContext(AuthContext);
}
export { useAuthContext }
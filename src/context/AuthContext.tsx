import { createContext } from 'react';
import { UserProfile } from '../helpers/firebase/data/UserProfile';

type AuthContextType = {
    profile: UserProfile;
    signIn: (email: string, password: string, onComplete: () => void) => void;
    register: (email: string, password: string) => void;
    updateDisplayName: (display_name: string) => void;
    updatePhotoURL: (url: string) => void;
    sendAuthEmailVerification: () => void;
    removeMyAccount: () => void;
    signOut: (onComplete: () => void) => void;
    isAuthenticating: boolean;
    isAuthenticated: () => boolean;
}

export const AuthContext = createContext({} as AuthContextType);
export default AuthContext;
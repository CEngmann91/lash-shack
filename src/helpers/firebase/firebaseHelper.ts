import { auth } from "../../firebase/firebase";
import {
    User as firebaseUser,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    updateProfile as firebaseUpdateProfile,
    signOut as firebaseSignOut,
    deleteUser as firebaseDeleteUser,
} from "@firebase/auth";

import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { UserProfile } from "../../types/UserProfile";
import { addDocument, deleteDocument, getDocument, updateDocument } from "../../firebase/firestore";
import { uploadImage } from "../../firebase/fireStorage";





export const signIntoUserAccount = async (email: string, password: string) => {
    let userProfile: UserProfile = {
        uid: "",
        account: "Standard",
        active: true,
        firstName: '',
        lastName: '',
        displayName: '',
        email: email,
        photoURL: '',
        phoneNumber: "",
        // subscribed: false,
        preferredLocation: 'Lash Shack'
    };


    try {
        // Sign in with the email and password.
        const userCredentials = await firebaseSignInWithEmailAndPassword(auth, email, password);
        const userData = userCredentials.user;
        // console.log("firebaseSignInWithEmailAndPassword", userData);

        userProfile.uid = userData.uid;
        userProfile.displayName = userData.displayName as string;
        userProfile.email = userData.email as string;
        userProfile.phoneNumber = userData.phoneNumber as string;
        // userProfile.photoURL = userData.photoURL as string;


        const docReq = await getDocument("users", userProfile.uid)
        const docData = docReq as UserProfile;

        userProfile.active = docData.active;
        userProfile.firstName = docData.firstName;
        userProfile.lastName = docData.lastName;
        userProfile.displayName = docData.displayName;
        userProfile.email = docData.email;
        userProfile.photoURL = docData.photoURL;

    } catch (error) {
        console.error(error)
        return null;
    }
    return userProfile;
}

export const createAUser = async (firstName: string, lastName: string, email: string, password: string, displayName: string) => {
    let userProfile: UserProfile = {
        uid: "",
        account: "Standard",
        active: true,
        firstName: '',
        lastName: '',
        displayName: '',
        email: email,
        photoURL: '',
        phoneNumber: "",
        // subscribed: false,
        preferredLocation: 'Lash Shack'
    };

    try {
        console.log("Creating a user.");

        const userCredentials = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
        const userData = userCredentials.user;

        userProfile.uid = userData.uid;
        userProfile.firstName = firstName;
        userProfile.lastName = lastName;
        userProfile.displayName = `${firstName} ${lastName}`;

        await addDocument("users", userProfile.uid, userProfile);

        // const updateDisplayName = 
        await updateUserDisplayName(userProfile, userProfile.displayName);

    } catch (error) {
        console.log(error);
        return null;
    }
    return userProfile;
}

export const updateUserDisplayName = async (user: UserProfile, display_name: string) => {
    try {
        const currentUser = getCurrentUser();
        // const updateProfile = 
        await firebaseUpdateProfile(currentUser, { displayName: display_name, });
        // const updateDoc = 
        await updateDocument("users", user.uid, user);

    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const updateUserPhotoURL = async (user: UserProfile, photo_url: string) => {
    try {
        const currentUser = getCurrentUser();
        // const updateProfile =
        await firebaseUpdateProfile(currentUser, { photoURL: photo_url })
        // const updateDoc = 
        await updateDocument("users", user.uid, user);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const signUserOut = async () => {
    try {
        const signOutReq = await firebaseSignOut(auth);
        return signOutReq;

    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const deleteUser = async (user: UserProfile) => {
    try {
        const user = getCurrentUser();
        const deleteDocReq = await deleteDocument("users", user.uid);
        return deleteDocReq;
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const getCurrentUser = (): firebaseUser => {
    return auth.currentUser as firebaseUser;
}






export const uploadProfilePhoto = async (
    photoFile: Blob | Uint8Array | ArrayBuffer, folder: string, id: string,
    onSuccess: (url: string) => void
) => {
    await uploadImage(folder, id, photoFile, onSuccess);
}

const getPathRef = (dir: string) => {
    const storage = getStorage()
    return ref(storage, dir);
}

export const getDownloadURLRef = async (dir: string) => {
    let data: string = "";
    const pathRef = getPathRef(dir);

    await getDownloadURL(pathRef)
        .then((res) => data = res)
        .catch(error => {
            // Handle any errors
        });
    return data;
}

export const getAll = async (dir: string) => {
    let data: string[] = [];
    const listRef = getPathRef(dir);
    const res = await listAll(listRef)

    const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
    data = await Promise.all(promises);

    return data;
}
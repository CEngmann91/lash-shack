import { auth, firestore } from "../../firebase/firebase";
import {
    User as firebaseUser,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    updateProfile as firebaseUpdateProfile,
    signOut as firebaseSignOut,
    deleteUser as firebaseDeleteUser,
} from "@firebase/auth";

import { getDownloadURL, getStorage, listAll, ref, TaskState } from "firebase/storage";
import { UserProfile } from "../../types/UserProfile";
import { addDocument, deleteDocument, getDocument, updateDocument } from "../../firebase/firestore";
import { uploadImage } from "../../firebase/fireStorage";
import { ProductItem } from "../../types/ProductItem";
import { PurchaseOrder } from "../../types/PurchaseOrder";
import { addDoc, collection } from "firebase/firestore";





// ==================== USER ====================//
/**
 * Signs in the user based on the email and password provided.
 *
 * @param {string} email The email used for the user profile.
 * @param {string} password The password used for the user profile.
 */
export const signIntoUserAccount = async (email: string, password: string) => {
    let userProfile: UserProfile = {
        uid: "",
        account: "Client",
        active: true,
        firstName: '',
        lastName: '',
        displayName: '',
        email: email,
        dob: '',
        photoURL: '',
        phoneNumber: "",
        memberSince: "",
        lastLoggedIn: "",
        billingAddress: null,
        preferredLocation: 'Lash Shack',
        position: "NA",
        summary: "",
    };

    try {
        // Sign in with the email and password.
        const userCredentials = await firebaseSignInWithEmailAndPassword(auth, email, password);
        const userData = userCredentials.user;
        // console.log("firebaseSignInWithEmailAndPassword", userData);
        userProfile.uid = userData.uid;
        // userProfile.displayName = userData.displayName as string;
        // userProfile.email = userData.email as string;
        // userProfile.phoneNumber = userData.phoneNumber as string;
        // userProfile.photoURL = userData.photoURL as string;
        if (userData.metadata.creationTime)
            userProfile.memberSince = userData.metadata.creationTime;
        if (userData.metadata.lastSignInTime)
            userProfile.lastLoggedIn = userData.metadata.lastSignInTime;


        const docReq = await getDocument("users", userProfile.uid)
        const docData = docReq as UserProfile;
        userProfile.active = docData.active;
        userProfile.account = docData.account;
        userProfile.firstName = docData.firstName;
        userProfile.lastName = docData.lastName;
        // userProfile.displayName = docData.displayName;
        userProfile.displayName = `${userProfile.firstName} ${userProfile.lastName}`;
        userProfile.email = docData.email;
        userProfile.dob = docData.dob;
        userProfile.phoneNumber = docData.phoneNumber;
        userProfile.photoURL = docData.photoURL;

        userProfile.position = docData.position;
        userProfile.summary = docData.summary;
        userProfile.startDate = docData.startDate;



        // updateUserDisplayName(userProfile, userProfile.displayName);
        return userProfile;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export const createAUser = async (firstName: string, lastName: string, email: string, password: string, displayName: string) => {
    let userProfile: UserProfile = {
        uid: "",
        account: "Client",
        active: true,
        firstName: '',
        lastName: '',
        displayName: '',
        email: email,
        dob: '',
        photoURL: '',
        phoneNumber: "",
        memberSince: "",
        lastLoggedIn: "",
        billingAddress: null,
        preferredLocation: 'Lash Shack',
        position: "NA",
        summary: "",
    };

    try {
        // console.log("Creating a user.");
        const userCredentials = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
        if (userCredentials) {
            const userData = userCredentials.user;

            userProfile.uid = userData.uid;
            userProfile.active = true;
            userProfile.account = "Client";
            userProfile.firstName = firstName;
            userProfile.lastName = lastName;
            userProfile.displayName = `${firstName} ${lastName}`;
            userProfile.email = email;
            if (userData.metadata.creationTime)
                userProfile.memberSince = userData.metadata.creationTime;
            if (userData.metadata.lastSignInTime)
                userProfile.lastLoggedIn = userData.metadata.lastSignInTime;

            await addDocument("users", userProfile.uid, userProfile);

            // const updateDisplayName = 
            await updateUserDisplayName(userProfile, userProfile.displayName);
        }

    } catch (error) {
        console.log(error);
        return null;
    }
    return userProfile;
}

export const updateUser = async (user: UserProfile) => {
    try {
        // const updateDoc = 
        await updateDocument("users", user.uid, user);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
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

export const updateUserActiveStatus = async (user: UserProfile, active: boolean) => {
    try {
        user.active = active;
        // const updateDoc = 
        await updateDocument("users", user.uid, user);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const signUserOut = async (user: UserProfile) => {
    try {
        // const updateDoc = 
        await updateDocument("users", user.uid, user);

        const signOutReq = await firebaseSignOut(auth);
        return signOutReq;
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const deleteUser = async () => {
    try {
        const currentUser = getCurrentUser();
        // const deleteUser = 
        await firebaseDeleteUser(currentUser);
        const deleteDocReq = await deleteDocument("users", currentUser.uid);
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
// ==============================================//





// ================== PRODUCTS ==================//
export const addProduct = async (folder: string, product: ProductItem) => {
    try {
        await addDocument(folder, product.id, product);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
        console.error(errorCode)
    }
}

export const deleteProduct = async (folder: string, id: string) => {
    try {
        await deleteDocument(folder, id);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
        console.error(errorCode)
    }
}

export const updateProduct = async (folder: string, product: ProductItem) => {
    try {
        // const updateDoc = 
        await updateDocument(folder, product.id, product);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}

export const updateProductActiveStatus = async (folder: string, product: ProductItem, active: boolean) => {
    try {
        product.active = active;
        // const updateDoc = 
        await updateDocument(folder, product.id, product);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
    }
}
// ==============================================//




// =================== ORDERS ===================//
export const addOrder = async (user: UserProfile, newOrder: PurchaseOrder) => {
    try {
        // Update user.
        // await updateUser(user);
        // Update the orders collection.
        await addDocument("orders", newOrder.id, newOrder);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
        console.error(errorCode)
    }
}

export const deleteOrder = async (folder: string, id: string) => {
    try {
        await deleteDocument("orders", id);
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        // onError(errorCode, errorMessage);
        console.error(errorCode)
    }
}
// ==============================================//






// =================== PHOTO ===================//
export const uploadPhoto = async (
    photoFile: Blob | Uint8Array | ArrayBuffer, folder: string, id: string,
    onProgress: (state: TaskState, progress: number) => void,
    onSuccess: (url: string) => void
) => {
    await uploadImage(folder, id, photoFile, onProgress, onSuccess);
}
// ==============================================//


export const addANewSubscriber = async (email: string) => {
    type Subscriber = {
        emailAddress: string;
    }
    let sub: Subscriber = {
        emailAddress: email
    }

    try {
        await addDocument("subscribers", email, { email: email })
            .then(result => {
                return new Promise<any>((res, reject) => res(result));
            })
            .catch(error => {
                return new Promise<any>((res, reject) => reject(error.message));
            })
            
            
            // .then(res => {
            //     alert("done")
            // })
            // .catch(error => {
            //     alert(error)
            // });
    } catch (error) {
        // const errorCode = error;//.code;
        // const errorMessage = error;//.message;
        // // onError(errorCode, errorMessage);
        // console.error(errorCode)
        return new Promise<any>((res, reject) => reject(error));
    }
}


const getPathRef = (dir: string) => {
    const storage = getStorage()
    return ref(storage, dir);
}

export const getDownloadURLRef = async (dir: string) => {
    // let data: string = "";
    const pathRef = getPathRef(dir);

    const url = await getDownloadURL(pathRef)
    // .then((res) => data = res)
    // .catch(error => {
    //     // Handle any errors
    // });
    return url;
}

export const getAllDownloadURLRef = async (dir: string) => {
    const listRef = getPathRef(dir);
    const res = await listAll(listRef)

    const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
    const results = await Promise.all(promises);
    let paths = [] as string[];
    for (const result of results)
        paths.push(result);
    return paths;
}
import {
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    updateProfile as firebaseUpdateProfile,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendEmailVerification as firebaseSendEmailVerification,
    deleteUser as firebaseDeleteUser,
    User as firebaseUser,
} from "@firebase/auth";
import { auth } from "../../networking/firebase/firebase";
import { addDocument, deleteDocument, getDocument, updateDocument } from "../../networking/firebase/firestore";
import { ACCOUNT_TYPES, UserEntity, UserProfile } from "./data/UserProfile";



export const signIntoUserAccount = async(
    email: string,
    password: string,
    onSuccess: (user: UserProfile) => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const userEntity: UserEntity = {
            uid: "", active: false, first_name: "", last_name: "", display_name: "",
            email_address: "", email_verified: false, photo_URL: "", phone_number: 0,
            location: "", last_login: "", member_since: "",
            account_type: ACCOUNT_TYPES.STANDARD,
            purchases: [],
            area_code: ""
        };

        // Sign in with the email and password.
        await firebaseSignInWithEmailAndPassword(auth, email, password)
            .then(
                async(userCredentials) => {
                    // SIGNED IN!!
                    const user = userCredentials.user;
                    const uid = user.uid;
                    userEntity.uid = uid;
                    userEntity.active = true;
                    userEntity.display_name = user.displayName as string;
                    userEntity.email_address = user.email as string;
                    userEntity.email_verified = user.emailVerified;
                    userEntity.phone_number = Number(user.phoneNumber)
                    userEntity.photo_URL = user.photoURL as string;
                    userEntity.last_login = user.metadata.lastSignInTime as string;
                    userEntity.member_since = user.metadata.creationTime as string;


                    // Get the details from the store.
                    await GetUserByUID(uid, 
                        (result) => {
                            const { account_type, area_code, display_name } = result;

                            userEntity.display_name = display_name as string;
                            userEntity.account_type = account_type;
                            userEntity.area_code = area_code;

                            const currentUser = new UserProfile(userEntity);
                            onSuccess(currentUser)
                        },
                        (errorCode, errorMessage) => onError(errorCode, errorMessage));
                }
            )
            .catch(error =>
            {
                const errorCode = error.code;
                const errorMessage = error.message;
                onError(errorCode, errorMessage);
            });

    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

export const createUser = async(
    email: string,
    password: string, 
    onSuccess: (user: UserProfile) => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const userEntity: UserEntity = {
            uid: "", active: false, first_name: "", last_name: "", display_name: "",
            email_address: "", email_verified: false, photo_URL: "", phone_number: 0,
            location: "", last_login: "", member_since: "",
            account_type: ACCOUNT_TYPES.STANDARD,
            purchases: [],
            area_code: ""
        };

        await firebaseCreateUserWithEmailAndPassword(auth, email, password)
            // Return the results once registered.
            .then(userCredentials => {
                userEntity.uid = userCredentials.user?.uid;
                userEntity.email_address = userCredentials.user.email as string;
                // console.log("createUserWithEmailAndPassword - ", userCredentials.user);
            })
            // Add the new user's document to the database.
            .then(
                async() => {
                    // Add's the new user to the firestore database.
                    await addDocument("users", userEntity.uid, userEntity,
                        () => {
                            const newUser = new UserProfile(userEntity);
                            onSuccess(newUser);
                        },
                        (errorCode, errorMessage) => {
                            console.error("addUserToFirestore(addDocument) - errorCode: " + errorCode + ", errorMessage: " + errorMessage);
                        }
                    );
                }
            )
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(userEntity);
                console.error("createUser - ", errorCode, errorMessage);
                onError(errorCode, errorMessage);
            });

    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

export const updateUserDisplayName = async(
    user: UserProfile,
    display_name: string,
    onSuccess: () => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const currentUser = getCurrentUser();
        await firebaseUpdateProfile(currentUser, { displayName: display_name, })
            // .then(
            //     async() => {
            //         await updateDocument("users", user.uid, user, onSuccess)
            //     }
            // )
            // .then(() => onSuccess())
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(userEntity);
                console.error("updateUserDisplayName - ", errorCode, errorMessage);
                onError(errorCode, errorMessage);
            });

        await updateDocument("users", user.uid, user, onSuccess)

        // await user.reload()
        //     .then(function () {
        //         // Profile updated!
        //         // console.log("user - ", user);
        //         onSuccess();
        //     })
        //     .catch((error) => {
        //         // console.log("error - ", user);
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         onError(errorCode, errorMessage);
        //     });
            
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

export const updateUserPhotoURL = async(
    photo_url: string,
    onSuccess: () => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const user = getCurrentUser();
        await firebaseUpdateProfile(user, { photoURL: photo_url })
            .then(() => onSuccess())
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(userEntity);
                console.error("updateUserPhotoURL - ", errorCode, errorMessage);
                onError(errorCode, errorMessage);
            });
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

export const sendUserEmailVerification = async(
    onSuccess: () => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const user = getCurrentUser();
        await firebaseSendEmailVerification(user)
            .then(() => onSuccess())
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("sendUserEmailVerification - ", errorCode, errorMessage);
                onError(errorCode, errorMessage);
            });
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

/**
 * Sign out user
 * @param {function} onSuccess Callback that returns the user data IF successful.
 * @param {function} onError Callback returned if any problems arise.
 */
export const signUserOut = async(
    onSuccess: () => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        await firebaseSignOut(auth)
            .then(() =>
            {
                // Sign-out successful.
                onSuccess();
            })
            .catch((error) => {
                // An error happened.
                const errorCode = error.code;
                const errorMessage = error.message;
                onError(errorCode, errorMessage);
            });
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

/**
 * Remove the current user
 * @param {function} onSuccess Callback that returns the user data IF successful.
 * @param {function} onError Callback returned if any problems arise.
 */
export const removeCurrentUser = async(
    onSuccess: () => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const user = getCurrentUser();
        // await RemoveUserFromFirestore(user);

        await deleteDocument("users", user.uid,
            () => { onSuccess() },
            ((u, v) => {
                // An error ocurred
                const errorCode = u;
                const errorMessage = v;
                onError(errorCode, errorMessage);
            })
        );

        
        await firebaseDeleteUser(user as firebaseUser)
            .then(() => { onSuccess() })
            .catch((error) => {
                // An error ocurred
                const errorCode = error.code;
                const errorMessage = error.message;
                onError(errorCode, errorMessage);
            });
    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}

export const GetUserByUID = async(
    uid: string,
    onSuccess: (user: UserEntity) => void,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    await getDocument("users", uid)
        .then(res => { onSuccess(res) })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            onError(errorCode, errorMessage);
            // console.error("GetUserByUID - ", errorCode, errorMessage);
        });
}

export const getCurrentUser = () : firebaseUser => {
    return auth.currentUser as firebaseUser;
}
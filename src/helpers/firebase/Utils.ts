import {
    signInWithEmailAndPassword,
    updateProfile,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    deleteUser,
} from "@firebase/auth";
import { auth } from "../../networking/firebase/firebase";
import { addDocument } from "../../networking/firebase/firestore";
import { UserProfile } from "./data/UserProfile";

export const createUser = async (email: string, password: string, onSuccess: (user: UserProfile) => void, onError: (errorCode: any, errorMessage: any) => void) => {
    try {
        let userObject = new UserProfile();

        await createUserWithEmailAndPassword(auth, email, password)
            // Return the results once registered.
            .then(userCrendentials => {
                userObject.uid = userCrendentials.user?.uid;
                userObject.email_address = userCrendentials.user.email as string;
                // console.log("createUserWithEmailAndPassword - ", userCrendentials.user);
            })
            // Add the new user's document to the database.
            .then(() => {


                // Add's the new user to the firestore database.
                addDocument("users", userObject.uid, userObject.toObject(),
                    () => {
                        onSuccess(userObject);
                        // console.log("addDocument - user has been added.")
                    },
                    (errorCode, errorMessage) => {
                        console.error("addUserToFirestore(addDocument) - errorCode: " + errorCode + ", errorMessage: " + errorMessage);
                    }
                );


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                console.log(userObject.toObject());
                console.error("createUserWithEmailAndPassword - ", errorCode, errorMessage);
                onError(errorCode, errorMessage);
            });

        // // Add's the new user to the firestore database.
        // await addDocument("users", userObject.uid, userObject.toObject(),
        //     () => {
        //         console.log("addUserToFirestore(addDocument) - user has been added.")
        //     },
        //     // (errorCode, errorMessage) => {
        //     //     console.error("addUserToFirestore(addDocument) - errorCode: " + errorCode + ", errorMessage: " + errorMessage);
        //     // }
        // );



    } catch (error) {
        const errorCode = error;//.code;
        const errorMessage = error;//.message;
        onError(errorCode, errorMessage);
    }
}
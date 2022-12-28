import { firestore } from "./firebase";
import {
    setDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    deleteField,
    Timestamp,
    // serverTimestamp,
    // FieldValue,
    onSnapshot,


    collection,
    FieldValue,
    addDoc,
} from 'firebase/firestore';




export const addDocument = async(
    collection_name: string, document_name: string, data: unknown,
    onSuccess: () => void, onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const docRef = doc(firestore, collection_name, document_name)
        await setDoc(docRef, data)
            .then(()=> onSuccess() )
            .catch((error) => onError(error.code, error.message) );
    } catch (error) {
        onError(error, error);
    }
}

/**
 * Updates a document to the firestore
 * @param {string} collection_name Name of the collection in the database.
 * @param {string} document_name Name of the document nested within the collection above.
 * @param {object} dataObject Object that will be overwritten.
 * @param {function} onSuccess Callback IF successful.
 * @param {function} onError Callback returned if any problems arise.
 */
export const updateDocument = async(
    collection_name: string, document_name: string, dataObject: any,
    onSuccess: () => void
    // , onError: (errorCode: unknown, errorMessage: unknown) => void
) : Promise<any> => {
    try {
        const docRef = doc(firestore, collection_name, document_name)
        await updateDoc( docRef, dataObject )
            .then(()=> onSuccess() )
            // .catch( (error) => onError(error.code, error.message) );
    } catch (error) {
        // onError(error, error);
        return new Promise<any>(res => res(error));
    }
}

export const getDocument = async(
    collection_name: string, document_name: string,
) : Promise<any> => {
    try {
        const docRef = doc(firestore, collection_name, document_name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
        {
            // console.log("Document data:", docSnap.data());
            return new Promise<any>( res => res(docSnap.data()) );
        }
        else 
        {
            // doc.data() will be undefined in this case
            // onError("Error", "Document does not exist");
            return new Promise<any>( res => res("Document does not exist") );
        }
    } catch (error) {
        // onError(error.code, error.message);
        return new Promise<any>( res => res(error) );
    }
}

/**
 * Deletes a document to the firestore
 * @param {string} collection_name Name of the collection in the database.
 * @param {string} document_name Name of the document nested within the collection above.
 * @param {function} onSuccess Callback IF successful.
 * @param {function} onError Callback returned if any problems arise.
 */
export const deleteDocument = async(
    collection_name: string, document_name: string,
    onSuccess: () => void, onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const docRef = doc(firestore, collection_name, document_name)
        await deleteDoc( docRef )
            .then( ()=> onSuccess() )
            .catch( (error) => onError(error.code, error.message) );
    } catch (error) {
        onError(error, error);
    }
}

export const documentExists = async(
    collection_name: string, document_name: string,
    onError: (errorCode: unknown, errorMessage: unknown) => void
) => {
    try {
        const docRef = doc(firestore, collection_name, document_name);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        onError(error, error);
        return false;
    }
}
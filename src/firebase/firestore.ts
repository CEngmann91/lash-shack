import { firestore } from "./firebase";
import {
    setDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    deleteField,
} from 'firebase/firestore';



export const addDocument = async (collection_name: string, document_name: string, data: unknown) => {
    try {
        const docRef = doc(firestore, collection_name, document_name)
        await setDoc(docRef, data)
            .then(result => {
                return result;
            })
        // .catch((error) => onError(error.code) );
    } catch (error) {
        // onError(error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

export const deleteDocument = async (collection_name: string, document_name: string) => {
    try {
        const docRef = doc(firestore, collection_name, document_name)
        // const deleteReq = 
        await deleteDoc(docRef)
            .then(result => {
                return result;
            })
        // .catch((error) => onError(error.code) );
    } catch (error) {
        // onError(error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

export const getDocument = async (collection_name: string, document_name: string): Promise<any> => {
    try {
        const docRef = doc(firestore, collection_name, document_name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            return new Promise<any>(res => res(docSnap.data()));
        }
        else {
            // doc.data() will be undefined in this case
            // onError("Error", "Document does not exist");
            // return new Promise<any>(res => res("Document does not exist"));
            return new Promise<any>((res, reject) => reject("Document does not exist"));
        }
    } catch (error) {
        // onError(error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

export const updateDocument = async (collection_name: string, document_name: string, data: any) => {
    try {
        const docRef = doc(firestore, collection_name, document_name)
        const update = await updateDoc(docRef, data)
        return update;
    } catch (error) {
        // onError(error, error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

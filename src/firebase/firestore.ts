import { firestore } from "./firebase";
import {
    setDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    addDoc,
} from 'firebase/firestore';



export const addDocument = async (collection_name: string, document_name: string | null, data: unknown) => {
    try {
        if (!document_name)
        {
            const dbRef = collection(firestore, collection_name);
            await addDoc(dbRef, data)
                .then(result => {
                    return new Promise<any>((res, reject) => res(result));
                })
                .catch(error => {
                    return new Promise<any>((res, reject) => reject(error));
                })
        }
        else
        {
            const dbRef = doc(firestore, collection_name, document_name)
            await setDoc(dbRef, data)
                .then(result => {
                    return new Promise<any>((res, reject) => res(result));
                })
                .catch(error => {
                    return new Promise<any>((res, reject) => reject(error));
                })
        }
    } catch (error) {
        // onError(error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

export const deleteDocument = async (collection_name: string, document_name: string) => {
    try {
        const dbRef = doc(firestore, collection_name, document_name)
        // const deleteReq = 
        await deleteDoc(dbRef)
            .then(result => {
                return new Promise<any>((res, reject) => res(result));
            })
            .catch(error => {
                return new Promise<any>((res, reject) => reject(error));
            })
    } catch (error) {
        // onError(error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

export const updateDocument = async (collection_name: string, document_name: string, data: any) => {
    try {
        const dbRef = doc(firestore, collection_name, document_name)
        await updateDoc(dbRef, data)
            .then(result => {
                return new Promise<any>((res, reject) => res(result));
            })
            .catch(error => {
                return new Promise<any>((res, reject) => reject(error));
            })
    } catch (error) {
        // onError(error, error);
        return new Promise<any>((res, reject) => reject(error));
    }
}

export const getDocument = async (collection_name: string, document_name: string): Promise<any> => {
    try {
        const dbRef = doc(firestore, collection_name, document_name);
        const docSnap = await getDoc(dbRef);
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
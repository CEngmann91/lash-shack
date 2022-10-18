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



// interface iProps {
//     collection_name: string;
//     document_name: string;
//     onClick?: (e: React.MouseEvent<HTMLElement>) => void;
// }
// const getDocument: React.FC<iProps> = ({ collection_name, document_name, onClick, ...props }: iProps) => {
// }


export const getDocument = async(
    collection_name : string, document_name : string,
    // onSuccess = (data) => {},
    // onError = (u, v) => {}
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
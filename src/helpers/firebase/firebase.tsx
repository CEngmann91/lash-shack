import { firebaseConfig } from './firebaseConfig';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
//import {...} from "firebase/database";
//import {...} from "firebase/functions";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseApp = getApp();
// Initialize Cloud Firestore through Firebase
export const firestore = getFirestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
// export const storage = getStorage();
export const storage = getStorage(firebaseApp);


// Auth - set persistance
// setPersistence(auth, inMemoryPersistence);




export const getImages = async (dir : string) => {
    let data : string[] = [];
    const storage = getStorage()
    const listRef = ref(storage, dir)
    const res = await listAll(listRef)

    const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
    data = await Promise.all(promises);

    return data;
}
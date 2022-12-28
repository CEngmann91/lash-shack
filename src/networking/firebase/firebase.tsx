import { firebaseConfig } from './firebaseConfig';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
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
export const storage = getStorage(firebaseApp);


// Auth - set persistance
setPersistence(auth, inMemoryPersistence);




const getPathRef = (dir: string) => {
    const storage = getStorage()
    return ref(storage, dir);
}

export const getDownloadURLRef = async(dir: string) => {
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



// export const getImage = async(dir: string) => {
//     return getDownloadURLRef(dir);
// }

// export const getImages = async (dir: string) => {
//     let data: string[] = [];
//     const listRef = getPathRef(dir);
//     const res = await listAll(listRef)

//     const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
//     data = await Promise.all(promises);

//     return data;
// }

// export const getVideo = async(dir: string) => {
//     return getDownloadURLRef(dir);
// }
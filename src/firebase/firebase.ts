import { firebaseConfig } from './firebase.config';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
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
// setPersistence(auth, inMemoryPersistence);
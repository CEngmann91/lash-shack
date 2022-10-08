import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import {
    getAuth,
    setPersistence,
    inMemoryPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
//import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore';
//import {...} from "firebase/functions";
import { getStorage, ref } from "firebase/storage";
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Initialize Cloud Firestore through Firebase
export const firestore = getFirestore();
// Create a root reference
export const storage = getStorage();


// Auth - set persistance
setPersistence(auth, inMemoryPersistence);
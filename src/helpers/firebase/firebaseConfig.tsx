import {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    // REACT_APP_DATABASE_URL,
    REACT_APP_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_MEASUREMENT_ID,
  } from "../../constants/firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
};
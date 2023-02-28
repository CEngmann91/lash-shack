export const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_DATABASE_URL,
    REACT_APP_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_MEASUREMENT_ID,


    REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION,
    REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT,
    REACT_APP_FIRESTORE_TRAINING_COLLECTION,
    REACT_APP_FIRESTORE_TRAINING_DOCUMENT,
    REACT_APP_FIRESTORE_GALLERY_COLLECTION,
    REACT_APP_FIRESTORE_GALLERY_DOCUMENT,
    REACT_APP_FIRESTORE_SERVICES_COLLECTION,
    REACT_APP_FIRESTORE_SERVICES_DOCUMENT,
    REACT_APP_FIRESTORE_COURSES_COLLECTION,
    REACT_APP_FIRESTORE_COURSES_DOCUMENT,

    REACT_APP_STORAGE_GALLERY_DIRECTORY,
    REACT_APP_STORAGE_VIDEOS_CLIENT_DIRECTORY,
} = process.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// export const firebaseConfig = {
//     apiKey: "AIzaSyBVgIhVoKjw4eHYfRCFkj0ElsWtl6XmKOM",
//     authDomain: "lash-shack-uk.firebaseapp.com",
//     projectId: "lash-shack-uk",
//     storageBucket: "lash-shack-uk.appspot.com",
//     messagingSenderId: "359883414285",
//     appId: "1:359883414285:web:be5083d062a7e616faae44",
//     measurementId: "G-XL66DWLGWG"
// };
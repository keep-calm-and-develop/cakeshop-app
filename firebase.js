// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_APP_NAME, REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    REACT_APP_FIREBASE_MESSAGE_APP_ID, REACT_APP_FIREBASE_MEASUREMENT_ID } from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: `${REACT_APP_FIREBASE_APP_NAME}.firebaseapp.com`,
    projectId: REACT_APP_FIREBASE_APP_NAME,
    storageBucket: `${REACT_APP_FIREBASE_APP_NAME}.appspot.com`,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: REACT_APP_FIREBASE_MESSAGE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, firestore, storage };
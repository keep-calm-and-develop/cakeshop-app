// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz4xyFgFICabOfmoZZXGoZr8Be070Obv4",
  authDomain: "cakeshop-ea8f5.firebaseapp.com",
  projectId: "cakeshop-ea8f5",
  storageBucket: "cakeshop-ea8f5.appspot.com",
  messagingSenderId: "337421629641",
  appId: "1:337421629641:web:996935a60cc5141b5e3518",
  measurementId: "G-W6CT4D551E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, firestore, storage };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-UlsO8wF2xXndOhtIvHzLhenSxuhfpS4",
    authDomain: "buy-sell-cars.firebaseapp.com",
    projectId: "buy-sell-cars",
    storageBucket: "buy-sell-cars.appspot.com",
    messagingSenderId: "154895034511",
    appId: "1:154895034511:web:efdb0d563cfe1e578068fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStoreDb = getFirestore();
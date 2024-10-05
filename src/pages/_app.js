// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtW2JqDwIfQHjiYK6A_1Hlo5LOpVFtvcc",
  authDomain: "cally-38fdc.firebaseapp.com",
  projectId: "cally-38fdc",
  storageBucket: "cally-38fdc.appspot.com",
  messagingSenderId: "474777992654",
  appId: "1:474777992654:web:a4c58af826977b72c63f9f",
  measurementId: "G-T4NV1KB3DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
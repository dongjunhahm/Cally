import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAtW2JqDwIfQHjiYK6A_1Hlo5LOpVFtvcc",
  authDomain: "cally-38fdc.firebaseapp.com",
  projectId: "cally-38fdc",
  storageBucket: "cally-38fdc.appspot.com",
  messagingSenderId: "474777992654",
  appId: "1:474777992654:web:a8521e37f8dbdc0cc63f9f",
  measurementId: "G-KN8PN0DFEH",
};

// Initialize Firebase

const app = initializeApp(config, "myApp");
export const auth = getAuth(app);
export default app;

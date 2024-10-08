import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};
console.log(firebaseConfig);

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

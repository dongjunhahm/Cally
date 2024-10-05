import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = process.env.FB_APIKEY;
const authDomain = process.env.FB_AUTHDOMAIN;
const projectId = process.env.FB_PROJECTID;
const storageBucket = process.env.FB_STORAGE_BUCKET;
const messagingSenderId = process.env.FB_MESSAGING_SENDERID;
const appId = process.env.FB_APPID;
const measurementId = process.env.FB_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase

const app = initializeApp(config, "myApp");
export const auth = getAuth(app);
export default app;

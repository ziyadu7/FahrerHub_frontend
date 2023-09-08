
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPI,
  authDomain: import.meta.env.VITE_AUTHDOMAIN ,
  projectId:import.meta.env.VITE_PROJECTID  ,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGINGSENDERID,
  appId:import.meta.env.VITE_APIID,
  measurementId:import.meta.env.VITE_MEASUREMENTID
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
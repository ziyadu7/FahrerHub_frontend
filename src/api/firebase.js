
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.vite_FIREBASEAPI,
  authDomain: "fir-2092e.firebaseapp.com",
  projectId: "fir-2092e",
  storageBucket: "fir-2092e.appspot.com",
  messagingSenderId: "761309781602",
  appId: "1:761309781602:web:547726b49c5305e51a3b3b",
  measurementId: "G-101XYR1H6E"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
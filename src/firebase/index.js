import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import firebaseConfig from "./config";
import { getAuth } from "firebase/auth";


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export default app;
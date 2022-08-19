
import { initializeApp } from "firebase/app";
import {getFirebase, getFirestore} from "firebase/firestore"
import App from "./App";


const firebaseConfig = {
  apiKey: "AIzaSyAEVPKIRMRvsRFTPgBrExeoeURRR2OYTmk",
  authDomain: "employee-app-49941.firebaseapp.com",
  projectId: "employee-app-49941",
  storageBucket: "employee-app-49941.appspot.com",
  messagingSenderId: "936627949669",
  appId: "1:936627949669:web:85cd1c4a150bfd4589b68c",
  measurementId: "G-PJSSP3VX3E",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
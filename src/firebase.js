import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB_oixMdg2VVLlnhCww6ge6rhwU6lp_QSw",
  authDomain: "our-journey-325fc.firebaseapp.com",
  projectId: "our-journey-325fc",
  storageBucket: "our-journey-325fc.appspot.com",
  messagingSenderId: "384803128044",
  appId: "1:384803128044:web:3e8ffca0dde71fb10edbc9",
  measurementId: "G-HQCYYELLFL"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
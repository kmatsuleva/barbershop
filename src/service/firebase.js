import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA51zz9R-OvACeCI3DZALQyHDQmezaA-50",
  authDomain: "barbershop-booking-syste-62a19.firebaseapp.com",
  databaseURL:
    "https://barbershop-booking-syste-62a19-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "barbershop-booking-syste-62a19",
  storageBucket: "barbershop-booking-syste-62a19.appspot.com",
  messagingSenderId: "744822449301",
  appId: "1:744822449301:web:c13d286f97262e01bde79c",
  measurementId: "G-XJMY7TMB1H",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export {
  analytics,
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};

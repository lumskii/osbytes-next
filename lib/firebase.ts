import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfTHh9qAGoliIHJtI6umqVH1QpNJoqsCY",
  authDomain: "osbytes-next.firebaseapp.com",
  projectId: "osbytes-next",
  storageBucket: "osbytes-next.appspot.com",
  messagingSenderId: "67826702594",
  appId: "1:67826702594:web:47a590060efdf079280a1b",
  measurementId: "G-B0QPF16S19"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const authen = getAuth(app);

export { db, authen };

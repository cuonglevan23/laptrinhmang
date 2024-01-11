import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
const firebaseConfig = {
  apiKey: "AIzaSyCyZojy-CtQdaVJUPaUFIvsRm2NZDV7oMM",
  authDomain: "sonic-meet-de3eb.firebaseapp.com",
  databaseURL: "https://sonic-meet-de3eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sonic-meet-de3eb",
  storageBucket: "sonic-meet-de3eb.appspot.com",
  messagingSenderId: "793869327349",
  appId: "1:793869327349:web:7f1cc7f3e03d688c809ebc",
  measurementId: "G-D4K4J6XED1"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth, firestore,storage };

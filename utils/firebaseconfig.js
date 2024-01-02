// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAITjBnmNzakwA4ihymPCog1oLamEO0_RA",
  authDomain: "blac-69a47.firebaseapp.com",
  databaseURL: "https://blac-69a47-default-rtdb.firebaseio.com",
  projectId: "blac-69a47",
  storageBucket: "blac-69a47.appspot.com",
  messagingSenderId: "386156923266",
  appId: "1:386156923266:web:2f1dcaa49d79013035279b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
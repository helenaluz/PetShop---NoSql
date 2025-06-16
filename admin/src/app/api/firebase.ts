// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAy_ngf35Krn7nBwC1uPxvuxU_CmXpGD0",
  authDomain: "petshop-nosql.firebaseapp.com",
  projectId: "petshop-nosql",
  storageBucket: "petshop-nosql.firebasestorage.app",
  messagingSenderId: "743773041921",
  appId: "1:743773041921:web:c100f27fb14beaaeadd700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
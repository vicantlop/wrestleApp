// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpPzoJ_kbEl5EbPfrdAOf4uBpMnnMaM5E",
  authDomain: "wrestleapp-e7d70.firebaseapp.com",
  databaseURL: "https://wrestleapp-e7d70-default-rtdb.firebaseio.com",
  projectId: "wrestleapp-e7d70",
  storageBucket: "wrestleapp-e7d70.appspot.com",
  messagingSenderId: "733606845851",
  appId: "1:733606845851:web:5760d899ca8e49c1ca953e",
  measurementId: "G-CZ3VZ7T4WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
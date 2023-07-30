import { initializeApp } from "firebase/app";
//getAuth sets up authentication from firebase
//Google Auth Provider supports set up sign-ups with Google
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

//import firestore database functions
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtY1UG79F5BsSLpNmIFijtdSx_HukIjCQ",
  authDomain: "chatapp-196d8.firebaseapp.com",
  projectId: "chatapp-196d8",
  storageBucket: "chatapp-196d8.appspot.com",
  messagingSenderId: "978129301057",
  appId: "1:978129301057:web:f8f81c8d034bd4b20220c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//defines which app to set up authentication for
export const auth = getAuth(app);
//defines the auth provider(s) the app will use e.g Google
export const provider = new GoogleAuthProvider();

//create a reference to your firestore database
export const database = getFirestore(app);
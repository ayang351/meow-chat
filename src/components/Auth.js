import '/Users/angelyang/Desktop/realchatapp/src/App.css';

//import firebase config variables created in firebase-config file
import {auth, provider} from "../firebase-config.js"

//import relevant built-in function from firebase
import {signInWithPopup, createUserWithEmailAndPassword} from "firebase/auth"
import { useRef } from "react";

//import Cookies from the universal cookie library
import Cookies from 'universal-cookie'


//create a reference for your cookie
//can get(), set(), remove() cookies in the browser
const cookies = new Cookies();


export const Auth = (authState) => {
    
    const { setisAuth } = authState; 



    //function that returns a promise to allow users to sign in with a pop-up
    //provided 2 arguments: (1) the authentication info (2) the provider from firebase-config.js
    const signInWithGoogle = async () => {
        
        try {
             //will return an object with email, displayname, profile pic
            const result = await signInWithPopup(auth, provider);

            //set up cookies upon sign-in
            //we want the refresh token to be stored in our cookie under the name "auth-token"
            cookies.set("auth-token", result.user.refreshToken);

            //set authentication to true
            setisAuth(true);


        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div className="auth">
            <p> </p>
            <button className="app-roundedButton" onClick={signInWithGoogle}> Sign in With Google </button>
        </div>
    );
}
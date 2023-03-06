// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwyciiJKfRH8y3_VpLDFBuRfc2bVUmWnI",
  authDomain: "react-ecommerce-facd5.firebaseapp.com",
  projectId: "react-ecommerce-facd5",
  storageBucket: "react-ecommerce-facd5.appspot.com",
  messagingSenderId: "42161387140",
  appId: "1:42161387140:web:9c9e65f7df591cee87b4d1",
  measurementId: "G-832M2WCZ14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = createContext(null)

function useProvideAuth(){
    const [user, setUser] = useState()
    const signUp = (email, password, displayName)=> createUserWithAndPassword(email, password).then(({user})=>{
        updateProfile(user, {displayName})
        setUser(user)
        return user
    })
    const signIn = signInWithEmailAndPassword
}
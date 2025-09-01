import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-442af.firebaseapp.com",
  projectId: "netflix-clone-442af",
  storageBucket: "netflix-clone-442af.firebasestorage.app",
  messagingSenderId: "345833050421",
  appId: "1:345833050421:web:0e3bf1fde672b035533c7c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {

    try {
    const res = await createUserWithEmailAndPassword (auth, email, password );
    const user = res.user;
    await addDoc (collection(db , "user"), {
        uid: user.uid,
        name,
        authProvider: "local", 
        email,
    });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
    
}

const login = async (email, password ) => {
    try {
    await signInWithEmailAndPassword(auth, email, password) ;
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};
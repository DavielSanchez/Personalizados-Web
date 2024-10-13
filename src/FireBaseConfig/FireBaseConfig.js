import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
// import { v4 } from 'uuid';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAwLw5y4n0E7WptxeF8RK6iQomccxCK84",
    authDomain: "p-shop-63339.firebaseapp.com",
    projectId: "p-shop-63339",
    storageBucket: "p-shop-63339.appspot.com",
    messagingSenderId: "171661215374",
    appId: "1:171661215374:web:c22ef7519468142ff36bdf",
    measurementId: "G-QDXE568XWT"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);

export async function userExist(uid) {
    const docRef = doc(db, 'users', uid);
    const res = await getDoc(docRef)
    console.log(res)
    return res.exists()
}

export async function registerNewUser(user) {
    try {
        const collectionRef = collection(db, 'users')
        const docRef = doc(collectionRef, user.uid)
        await setDoc(docRef, user);
    } catch (err) {
        console.log(err)
    }
}
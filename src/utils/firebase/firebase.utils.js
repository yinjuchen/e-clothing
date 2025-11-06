import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBaeBFDWZuFJySaG-zb6Bkt8TkTg1nTHo",
  authDomain: "e-clothing-2ce58.firebaseapp.com",
  projectId: "e-clothing-2ce58",
  storageBucket: "e-clothing-2ce58.firebasestorage.app",
  messagingSenderId: "987732067785",
  appId: "1:987732067785:web:9d282d070ffd6655b5d418",
  measurementId: "G-EEZ3LFV26W"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

// Create a Function to Store User Data
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;


  // Reference to the user document inside "users" collection
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  // Check if the user already exists
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  // If not, create a new document
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()
  
    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch(error) {
      console.log('error cretating the user',error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email,password)
}
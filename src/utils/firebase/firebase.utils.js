import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAHNRL_LU8riU6_fbO0YqPraBBLORgw7ns',
  authDomain: 'crwn-clothing-db-ce580.firebaseapp.com',
  projectId: 'crwn-clothing-db-ce580',
  storageBucket: 'crwn-clothing-db-ce580.appspot.com',
  messagingSenderId: '718250273021',
  appId: '1:718250273021:web:65cf985be175334d767694',
};

const firebaseApp = initializeApp(firebaseConfig);

//you can have multiple provider for different popup
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

//auth is a singleton
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//get the firestore database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data does not exists
  // create /set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists, return userDocRef
  return userDocRef;
};

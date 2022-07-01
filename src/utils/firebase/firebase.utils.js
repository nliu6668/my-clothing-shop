import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAHNRL_LU8riU6_fbO0YqPraBBLORgw7ns',
  authDomain: 'crwn-clothing-db-ce580.firebaseapp.com',
  projectId: 'crwn-clothing-db-ce580',
  storageBucket: 'crwn-clothing-db-ce580.appspot.com',
  messagingSenderId: '718250273021',
  appId: '1:718250273021:web:65cf985be175334d767694',
};

const firebaseApp = initializeApp(firebaseConfig);

//you can have multiple googleProvider for different popup
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//auth is a singleton
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//get the firestore database
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
  // field
) => {
  Array.from(objectsToAdd).forEach((ob) => {
    console.log('collectionKey; ' + collectionKey);
    console.log('Object title: ' + ob.title);
  });
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  Array.from(objectsToAdd).forEach((objectToAdd) => {
    // objectsToAdd.forEach((objectToAdd) => {
    const docRef = doc(collectionRef, objectToAdd.title.toLowerCase());
    // const docRef = doc(db, collectionKey, objectToAdd.title.toLowerCase());
    // you also can pass the field
    //const docRef = doc(collectionRef, objectToAdd[field].toLowerCase());
    batch.set(docRef, objectToAdd);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  //acc == accumulator, {} ==initialize of return object, return object
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  // db == database, 'users'== collection, userAuth.uid == user document
  if (!userAuth) return;
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists, return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);

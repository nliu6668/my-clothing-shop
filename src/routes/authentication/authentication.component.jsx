import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
  auth,
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

const Authentication = () => {

    const logGoogleUser = async () => {
        // const response = await signInWithGooglePopup();
        // destruct 'user' from 'response'
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);       
    };

    // only call this once, auth is a singleton
    // useEffect(() => {
    //   async function getResult(){
    //   const response = await getRedirectResult(auth);
    //   if(response){
    //     const userDocRef = await createUserDocumentFromAuth(response.user);
    //   }
    // } 
    // getResult();
    // },[]);

    // const logGoogleRedirectUser = async() => {
    //   const {user} = await signInWithGoogleRedirect();
    //   console.log({user});
    // }

  return (
    <div className='authentication-container'> 

      {/* <button onClick={logGoogleUser} >Sign in with Google</button> */}
      <SignInForm />
      <SignUpForm />
      {/* <button onClick={logGoogleRedirectUser} >Sign in with Google Redirect</button> */}
    </div>
  )
}

export default Authentication

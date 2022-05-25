import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
  auth,
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

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
    <div> 
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser} >Sign in with Google</button>
      <SignUpForm />
      {/* <button onClick={logGoogleRedirectUser} style={{fontSize: '1.5rem',fontWeight:"bold", backgroundColor:'pink'}}>Sign in with Google Redirect</button> */}
    </div>
  )
}

export default SignIn

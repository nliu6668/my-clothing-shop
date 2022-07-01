
import { useState} from 'react';
import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'; 

import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'; 

const defaultFormFields = {  
    email: '',
    password: ''
}

const SignInForm = () => {
 const [formFields, setFormField] = useState(defaultFormFields);
 const {email,password} = formFields;
 
 //replace this function with auth state listner
//  const { setCurrentUser } = useContext(UserContext);


 const resetFormFields = () => {
     setFormField(defaultFormFields);
 }

 const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    // setCurrentUser(user);
    await createUserDocumentFromAuth(user);
 }


 const handleSubmit = async (event) =>{
    event.preventDefault();
  
    try{
        //destruct user from response
        // const response = await signInAuthUserWithEmailAndPassword
        const { user } = await signInAuthUserWithEmailAndPassword(
            email,
            password
        );
        // setCurrentUser(user);
        console.log(user);
       
    }catch(error){
    //    console.log(error);
        switch(error.code){
            case 'auth/wrong-password':
                alert('Incorrect password for email');
                break;
            case 'auth/user-not-found':
                alert('No user associated with this email');
                break;
            default:
                console.log(error);
        }
    }
    resetFormFields(); 
 }
  
 const handleChange = (event) => {
    const  {name, value } = event.target;
    setFormField({...formFields, [name]:value});
 }
  return (
    <div className='sign-up-container'>
        <h2>Alredy have the account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
        
            <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email}
            />

            <FormInput 
                label="Password"
                type="password" 
                required 
                onChange={handleChange} 
                name='password' 
                value={password}
            />
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>
                {/* <Button type='button' buttonType='google' onClick={signInWithGoogle}> */}
                    Google sign in 
                </Button>
            </div>             
        </form>
    </div>
  )
}

export default SignInForm

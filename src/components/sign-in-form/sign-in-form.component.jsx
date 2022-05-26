
import { useState } from 'react';
import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils'; 

import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component'; 

const defaultFormFields = {  
    email: '',
    password: ''
}

const SignInForm = () => {
 const [formFields, setFormField] = useState(defaultFormFields);
 const {email,password} = formFields;

 const resetFormFields = () => {
     setFormField(defaultFormFields);
 }

 const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup()
 }


 const handleSubmit = async (event) =>{
    event.preventDefault();
  
    try{
        const response = await signInAuthUserWithEmailAndPassword(
            email,
            password
        );
        console.log(response);
       
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
        <span>Sign ip with your email and password</span>
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
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                    Google sign in 
                    </Button>
            </div>             
        </form>
    </div>
  )
}

export default SignInForm

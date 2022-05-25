
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } 
from '../../utils/firebase/firebase.utils';


const defaultFormFields = {
    displayName:'',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
 const [formFields, setFormField] = useState(defaultFormFields);
 const {displayName, email,password,confirmPassword } = formFields;

 const resetFormFields = () => {
     setFormField(defaultFormFields);
 }

 const handleSubmit = async (event) =>{
    event.preventDefault();
    if(password !== confirmPassword){
        alert("Password doesn't match");
        return;
    }
    
    try{
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, { displayName });
        // resetFormFields(); 
    }catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert("Can't creat user, email alreay in use");
        }else{
            console.log("User creation encountered an error", error.message);
        }     
    }
    resetFormFields(); 
 }
  

 

 const handleChange = (event) => {
    const  {name, value } = event.target;
    setFormField({...formFields, [name]:value});
 }
  return (
    <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={handleSubmit}>
            <label >Display Name</label>
            <input 
                type="text" 
                required 
                onChange={handleChange} 
                name='displayName' 
                value={displayName}
            />

            <label >email</label>
            <input 
                type="email" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email}
            />

            <label >Password</label>
            <input 
                type="password" 
                required 
                onChange={handleChange} 
                name='password' 
                value={password}
            />

            <label>Confirm password</label>
            <input 
                type="password" 
                required 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
            />

            <button type="submit">Sign Up</button>
        </form>
      
    </div>
  )
}

export default SignUpForm

import {createContext, useState, useEffect} from 'react';
import { 
    onAuthStateChangedListner,
    createUserDocumentFromAuth,
 } from '../utils/firebase/firebase.utils';

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


//provider allows children to use any value stored
export const UserProvider = ({children}) => {
    const[currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect( () => {
        const unsubcribe = onAuthStateChangedListner((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        });

        return unsubcribe;
    }, [])

    return <UserContext.Provider value = {value}> 
        {children}
    </UserContext.Provider>
}
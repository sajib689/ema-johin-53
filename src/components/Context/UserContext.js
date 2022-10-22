import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from './../../Firebase/Firebase.init';
const auth = getAuth(app);
export const AuthContext = createContext();
const UserContext = ({children}) => {
    
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const createUser = (email,password) => {
        createUserWithEmailAndPassword(auth, email, password);
    };
    const logIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
        
    };

    const logOut = () => {
        return signOut(auth);
    };
    useEffect(() => {
      const unSubscribe =  onAuthStateChanged(auth, currentUser => {
            console.log('logged out', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    },[])
    const authInfo = {user, createUser, logIn, logOut, loading};
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                    {children}
                </AuthContext.Provider>
        </div>
    ); 
};

export default UserContext;
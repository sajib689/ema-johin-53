import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { AuthContext } from '../Context/UserContext';
import './SignUp.css'
const SignUp = () => {
const [error,setError] = useState(null);
const {createUser} = useContext(AuthContext)
    const handleSubmit = (event) => {
       
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        
        console.log(email, password, confirm);
        
        if(password.length < 6) {
            
            setError('Password must be at least 6 characters long.');
        return;
        }
        if (password !== confirm) {
            setError('Your password is incorrect. Please try again.');
        return;
        }
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => console.error(error));
    };

    return (
        
            <div className='form-container'>
            <h2 className='form-title'>SignIn Page</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <label htmlFor='email'>
                    Email
                </label>
                <input type='email' name='email' required></input>
                <label htmlFor='password'>
                    Password
                </label>
                <input type='password' name='password' required></input>
                <label htmlFor='confirm'>
                   Confirm Password
                </label>
                <input type='password' name='confirm' required></input>
            </div>
            <input type='submit' className='btn-submit'></input>
        </form>
        <p className='margin'>New to ema john <Link to='/login'>Already have an account</Link></p>
        <p>{error}</p>
        </div>
        
    );
};

export default SignUp;
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './Login.css'

const Login = () => {
    const {logIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname|| '/';
    // const [error,setError]= useState(null);
    const handleLogIn =(event) => {
        event.preventDefault();
        const form = event.target;
        const email= form.email.value;
        const password = form.password.value;
        console.log(email, password);
        logIn(email, password)
        .then(result=> {
            const user = result.user;
            console.log(user);
            form.reset();
            navigate(from,{replace: true});
        })
        .catch(error => {console.error(error)});
    };
    return (
        
            <div className='form-container'>
            <h2 className='form-title'>Login Page</h2>
        <form onSubmit={handleLogIn}>
            <div className='form-control'>
                <label htmlFor='email'>
                    Email
                </label>
                <input type='email' name='email' required></input>
                <label htmlFor='password'>
                    Password
                </label>
                <input type='password' name='password' required></input>
            </div>
            <input type='submit' className='btn-submit'></input>
        </form>
        <p className='margin'>New to ema john <Link to='/signup'>Create a new account</Link></p>
        </div>
        
    );
};

export default Login;
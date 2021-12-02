import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username: username,
                email: email,
                password: password,
            });
            res.data && window.location.replace('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='register'>
            <div className="register-title">Register</div>
            <form className='register-form' onSubmit={handleSubmit}>
                <label className='login-label'>Username</label>
                <input
                    type="text"
                    placeholder='Username...' className='register-input'
                    onChange={(e) => setUsername(e.target.value)} />
                <label className='login-label'>Email</label>
                <input
                    type="text"
                    placeholder='Enter your Email...' className='register-input'
                    onChange={(e) => setEmail(e.target.value)} />
                <label className='register-label'>Password</label>
                <input
                    type="password"
                    placeholder='Enter your password...' className='register-input'
                    onChange={(e) => setPassword(e.target.value)} />
                <button className='register-button'>Register</button>
            </form>
            <Link className='link' to='/login'>
                <button className='register-login-button'>Login</button>
            </Link>
        </div>
    )
}

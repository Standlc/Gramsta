import React, { useRef, useContext } from 'react'
import './login.css'
import { Context } from '../../context/Context';
import { loginCall } from '../../apiCalls';
import { Link } from 'react-router-dom';

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context)


    const handleSubmit = async (e) => {
        e.preventDefault();
        loginCall({
            username: userRef.current.value,
            password: passwordRef.current.value
        }, dispatch)
    };

    return (
        <div className='login'>
            <div className="login-title">Login</div>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Username' className='login-input'
                    required
                    ref={userRef} />
                <input
                    type="password"
                    placeholder='Password' className='login-input'
                    required
                    ref={passwordRef} />
                <button className='login-button' disable={isFetching}>Login</button>
            </form>
            <Link className='link' to='/register'>
                <button className='login-register-button'>Register</button>
            </Link>
        </div>
    )
}

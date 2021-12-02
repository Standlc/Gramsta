import React, { useContext } from 'react'
import './settings.css';
import User from '../../user (1).png';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { Logout } from '../../context/Actions';

export default function SettingChangePassword() {
    const PF = 'http://localhost:5000/images/';
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {

        dispatch(Logout())
        window.location.replace('/login');
    }
    return (
        <div className='settings-container'>
            <div className="settings-container-left">

                <Link className='link' to='/modify-profile'>
                    <div className="setting-name not-selected">Modify Profile</div>
                </Link>
                <Link className='link' to='/password'>
                    <div className='setting-name not-selected'>Change password</div>
                </Link>
                <Link className='link' to='/delete'>
                    <div className='setting-name not-selected'>Delete Account</div>
                </Link>
                <Link className='link' to='/logout'>
                    <div className='setting-name highlited'>Logout</div>
                </Link>
            </div>
            <div className="settings-container-right">
                <div className="setting-user-info">

                    <img className='setting-profile-picture' src={user?.profilePicture ? PF + user.profilePicture : User} alt="" />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

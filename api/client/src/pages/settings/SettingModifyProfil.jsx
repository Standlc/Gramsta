import React, { useContext, useState } from 'react';
import './settings.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import User from '../../user (1).png';
import axios from 'axios';

export default function SettingModifyProfil() {
    const PF = 'http://localhost:5000/images/';
    const { user, dispatch } = useContext(Context);


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture] = useState('');
    const [file, setFile] = useState('');

    console.log(user.username)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' })
        const updatedUser = {
            userId: user._id,
            username: username ? username : user.username,
            email: email ? email : user.email,
            profilePicture : profilePicture ? profilePicture : user.profilePicture
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updatedUser.profilePicture = filename;
            try {
                await axios.post('/upload', data)
            } catch (error) {
            }
        }
        try {
            const res = await axios.put('/users/' + user._id, updatedUser);
            dispatch({ type: 'UPDATE_SUCCESSFULL', payload: res.data })
        } catch (error) {
            dispatch({ type: 'UPDATE_FAILED' })
        }

    };

    return (
        <div className='settings-container'>
            <div className="settings-container-left">
                <div className="setting-name highlighted">Modify Profile</div>
                <Link className='link' to='/password'>
                    <div className='setting-name not-selected'>Change password</div>
                </Link>
                <Link className='link' to='/delete'>
                    <div className='setting-name not-selected'>Delete Account</div>
                </Link>
                <Link className='link' to='/logout'>
                    <div className='setting-name not-selected'>Logout</div>
                </Link>
            </div>
            <div className="settings-container-right">
                <form onSubmit={handleSubmit}>
                    <div className="setting-user-info">
                        <label htmlFor="fileInput">
                            {file ? <img className='setting-profile-picture' src={URL.createObjectURL(file)} alt=''/> :
                                <img className='setting-profile-picture' src={user.profilePicture ? PF + user.profilePicture : User} alt="" />}
                        </label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />

                        <p>{user.username}</p>
                    </div>

                    <div className="setting">
                       
                        <input 
                        type="text"
                        placeholder='New Username'
                        onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="setting ">
                       
                        <input 
                        type="text"
                        placeholder='New Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <button className='setting-update-button' type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

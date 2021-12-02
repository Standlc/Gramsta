import './homeCreatePost.css';
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context'
import Plus from '../add.png';
import User from '../../user (1).png';
import axios from 'axios';

export default function HomeCreatePost() {
    const { user } = useContext(Context);
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState('');
    const [photo] = useState('');
    const PF = 'http://localhost:5000/images/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            caption: caption,
            photo,
            userId: user._id,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('/upload', data,)
            } catch (error) {
            }
        }
        try {
            await axios.post('/posts',
                newPost,
                { headers: { token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken } });
            window.location.replace('/');
        } catch (error) {
        }
    };
    const cancelUpload = () => {
        setFile('')
    }
    return (
        <div className='home-create-post-container'>
            <div className="home-create-post-header">
                <div className='home-create-post-profile-add-btn'>
                    <img
                        src={user.profilePicture ? PF + user.profilePicture : User}
                        alt=""
                        className='home-create-post-profilePic' />
                    <div className="home-create-image-container link">
                        <label id='add-photo-label' htmlFor="fileInput">
                            <img className='home-add-photo-icon' src={Plus} alt="" />
                        </label>
                        <input
                            id='fileInput'
                            type="file"
                            accept='.png, .jpeg, .jpg'
                            style={{ display: 'none' }}
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                </div>
                {file &&
                    <div>
                        <button onClick={handleSubmit} className='post-update-btn'>Upload</button>
                        <button onClick={cancelUpload} className='cancel-update-btn'>Cancel</button>
                    </div>
                }
            </div>

            <div style={{ height: '1px', width: 'calc(100% - 30px)', backgroundColor: 'rgb(100, 100, 100)', margin: '0 auto' }}></div>

            <form  >
                {file && <img className='home-article-photo-chosen' alt='' src={URL.createObjectURL(file)} />}
                <input
                    name="caption"
                    placeholder="Share what's on your mind, post a photo..."
                    className='home-write-caption-input'
                    onChange={(e) => setCaption(e.target.value)} >
                </input>

            </form>

        </div>
    )
}

import './modifyPost.css';
import React, { useContext, useState } from 'react'
import { Context } from '../../context/Context';
import axios from 'axios';
import { useParams } from 'react-router';

export default function ModifyPost({ PF, User, post, focusPostContainer, setModifyF, wraperModifyPost }) {

    const { user } = useContext(Context);
    const URLusername = useParams().username;
    const [updatedCaption, setUpdatedCaption] = useState(post.caption)

    const handleNewCaption = (e) => {
        setUpdatedCaption(e.target.value)
        console.log(updatedCaption)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/posts/${post._id}`, { userId: user._id, caption: updatedCaption },
            { headers: { token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken } });
            window.location.replace(URLusername ? `/profile/${user.username}` : '/');
        } catch (error) { console.log(error) }
    };
    return (

        <div className={wraperModifyPost}>
        <article className={focusPostContainer}>
            <form>


                <header  className='article-header'>
                    <div className="author-header-info">
                        <img className='author-user-icon' src={user.profilePicture ? PF + user.profilePicture : User}
                            alt="" />
                        <h3 id='author-name'>{user.username} </h3>
                    </div>

                    <div>
                        {updatedCaption !== post.caption && <button
                            type="submit"
                            className='post-update-btn'
                            onClick={handleSubmit}>Update Post</button>}
                        <button
                            className='cancel-update-btn'
                            onClick={setModifyF}>Cancel</button>
                    </div>
                </header>





                <div className="image-container">
                    <img className='article-image' src={PF + post.photo} alt="" />
                </div>
                <div className="modify-article-description">
                    <h4 id='author-name'>{user.username} </h4>
                    <input
                        autoFocus
                        name="caption"
                        defaultValue={updatedCaption}
                        className='modify-caption-input'
                        onChange={handleNewCaption}
                    >
                    </input>
                </div>
            </form>
        </article>
        </div>
    )
}

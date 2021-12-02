import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { Context } from '../../context/Context';
import User from '../../user (1).png'
import './profileComment.css'
import Like from '../../heart.png';
import Menu from '../../ellipsis.png';
import RedLike from '../../heartRed.png';
import PostDelModify from '../Home/PostDelModify';
import ProfileCommentSection from './ProfileCommentSection';



export default function ProfileComment({ commentUser, setCommentUser, userProfile, post, likes, liked, setLiked, setLikes, }) {
    const PF = 'http://localhost:5000/images/';
    const { user } = useContext(Context);
    const [captionUpdated, setCaptionUpdated] = useState(false);
    const [commentInput, setCommentInput] = useState('');


    const postCommentHandler = async () => {
        // e.preventDefault()
        if (commentInput.length !== 0) {
            setCommentInput('')
            const res = await axios.post('/comments/' + post._id, { comment: commentInput, userId: user._id });

            const { password, email, followers, followings, _id, createdAt, updatedAt, ...others } = user;
            setCommentUser([...commentUser, { ...others, ...res.data }])
            // console.log({ ...others, ...res.data})
        }
    }
    const likeHandler = async () => {
        try {
            axios.put('/posts/' + post._id + '/like', { userId: user._id })
        } catch (error) { }
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    }

    const [dropDown, setDropDown] = useState(false);
    const setDropDownF = () => {
        setDropDown(!dropDown)
    }
    const [modify, setModify] = useState(false);
    const setModifyF = () => {
        setModify(!modify);
        setDropDown(false);
        setUpdatedCaption(finalNewCaption)
    }


    const [updatedCaption, setUpdatedCaption] = useState(post.caption)
    const [finalNewCaption, setFinalNewCaption] = useState(post.caption)

    const handleNewCaption = (e) => {
        setUpdatedCaption(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCaptionUpdated(true);
        try {
            const res = await axios.put(`/posts/${post._id}`, { userId: user._id, caption: updatedCaption });
            console.log(res.data.caption);
            setFinalNewCaption(res.data.caption)
            setModify(!modify)
        } catch (error) { console.log(error) }
    };


 
    return (

        <div className="profile-comment-section-container-container">

            {dropDown && <div className="tap-to-hide-del" onClick={setDropDownF}></div>}

            <header className='profile-article-header-container' >
                <div className='profile-article-header'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/profile/${userProfile.username}`}>
                            <img className='profile-author-user-icon' src={userProfile.profilePicture ? PF + userProfile.profilePicture : User}
                                alt="" />
                        </Link>
                        <div>
                            <h3 style={{ fontWeight: '500' }}>{userProfile.username} </h3>
                            <p style={{ fontSize: '14px', textTransform: 'none' }} className='post-date'>{format(post.createdAt)}</p>
                        </div>
                    </div>


                    {user.username === userProfile.username && <img className='profile-home-menu-dropdown' src={Menu} onClick={setDropDownF} alt='' />}

                </div>


                {modify ?
                    <div>
                        <div style={{ position: 'relative', marginTop: '15px', minHeight: '22px' }}>
                            <textarea
                                autoFocus
                                name="caption"
                                defaultValue={updatedCaption}
                                className='profile-modify-caption-input'
                                onChange={handleNewCaption}
                            >
                            </textarea>
                            {updatedCaption}

                        </div>
                        <form style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                            {updatedCaption !== post.caption &&
                                <button
                                    type="submit"
                                    className='post-update-btn'
                                    onClick={handleSubmit}>Update Post</button>}
                            <button
                                style={{ marginRight: '0px' }}
                                className='cancel-update-btn'
                                onClick={setModifyF}>Cancel</button>
                        </form>
                    </div>

                    : <>
                        {post.caption && !captionUpdated &&
                            <p style={{ marginTop: '15px' }}>{post.caption}</p>}
                        {captionUpdated && updatedCaption !== '' ?
                            <p style={{ marginTop: '15px' }}>{finalNewCaption}</p>
                            : <></>}

                    </>
                }

                <PostDelModify setModifyF={setModifyF} setModify={setModify} post={post} dropDown={dropDown} />
            </header>





            <div className='profile-comment-section-container'>
                {commentUser?.map((comment) => {
                    return comment && <ProfileCommentSection key={comment._id} comment={comment} />
                })}
            </div>


            <div className="profile-comment-input-container">
                <div className="interaction">
                    <img className='like-icon-btn' src={liked ? RedLike : Like} alt="" onClick={likeHandler} />
                    <span className='post-likes'>{likes}</span>
                </div>
                <form style={{ display: 'flex', marginTop: '15px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', minHeight: '22px', padding: '10px', flexGrow: '1' }}>
                        <textarea
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    postCommentHandler()
                                }
                            }}
                            type="text"
                            value={commentInput}
                            className='profile-comment-input' placeholder='Add a comment...'
                            onChange={(e) => setCommentInput(e.target.value)}>
                        </textarea>
                        {commentInput}
                    </div>

                    <button
                        type='submit'
                        className='profile-post-comment-btn'
                        onClick={postCommentHandler}>Post</button>
                </form>
            </div>
        </div>
    )
}


{/* <div>
    {updatedCaption !== post.caption && <button
        type="submit"
        className='post-update-btn'
        onClick={handleSubmit}>Update Post</button>}
    <button
        className='cancel-update-btn'
        onClick={setModifyF}>Cancel</button>
</div> */}
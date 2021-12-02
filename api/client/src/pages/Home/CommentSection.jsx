import './commentSection.css'
import React, { useContext, useState } from 'react'
import { format } from 'timeago.js';
import User from '../../user (1).png';
import { Link } from 'react-router-dom';
import Menu from '../../ellipsis.png';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function CommentSection({ comment, post }) {

    const { user } = useContext(Context);
    const PF = 'http://localhost:5000/images/';

    const [commentSettings, setCommentSettings] = useState(false);
    const handleDeleteComment = async () => {
        await axios.put('/posts/comment/delete/' + comment._id, { postId: post._id, userId: user._id });
        // console.log(comment._id)
        // console.log(post._id)
        // console.log(user._id)
        console.log('deleted')
    }


    if (!comment) {
        return <div></div>
    } else return (
        <div className="comment-section">

            <span>
                <Link className='link' to={`/profile/${comment.username}`}>
                    <img className='comment-profile-picture' src={comment.profilePicture ? PF + comment.profilePicture : User} alt="" />
                </Link>
            </span>

            <span style={{display:'flex', flexDirection:'column', alignItems:'start'}}>
                <div className="comment-content">
                    <span style={{marginRight:'5px', fontWeight:'600'}}>
                        {comment.username}
                    </span>
                    <span>
                        {comment.comment}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <p style={{ fontSize: '12px', color: 'gray', marginRight: '10px' }}>{format(comment.createdAt)} </p>

                    {user._id === comment.userId &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img onClick={() => setCommentSettings(!commentSettings)} className='comment-menu-btn' src={Menu} alt="" />

                            {commentSettings &&
                                <div className='comment-settings-container'>

                                    <div className='comment-setting'>
                                        Modify
                                    </div>
                                    <div className='comment-setting' onClick={handleDeleteComment}>
                                        Delete
                                    </div>
                                </div>
                            }
                        </div>}
                </div>
            </span>
        </div>
    )
}

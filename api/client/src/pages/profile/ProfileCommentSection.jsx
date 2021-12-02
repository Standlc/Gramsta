import React, { useContext, useState } from 'react'
import Menu from '../../ellipsis.png';
import User from '../../user (1).png'
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function ProfileCommentSection({ comment }) {
    const { user } = useContext(Context);

    const [commentSettings, setCommentSettings] = useState(false);
    const handleDeleteComment = async () => {
        // await axios.put('/posts/comment/delete/' + comment._id, { postId: post._id, userId: user._id });
        // console.log(comment._id)
        // console.log(post._id)
        // console.log(user._id)
        console.log('deleted')
    }

    const PF = 'http://localhost:5000/images/';

    return (
        <div className="profile-comment-section" key={comment._id} >
            <span>
                <Link to={`/profile/${comment.username}`}>
                    <img className='profile-comment-profile-picture' src={comment.profilePicture ? PF + comment.profilePicture : User} alt="" />
                </Link>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <span style={{ marginRight: '5px', fontWeight: '600', fontSize: '15px' }}>
                        {comment.username}
                    </span>
                    <span style={{ fontSize: '15px', marginRight: '10px', maxWidth: '100px' }}>
                        {comment.comment}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
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
            </div>
        </div>
    )
}

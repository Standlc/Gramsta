import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import User from '../../user (1).png';
import './followersList.css'

export default function FollowersList({ follower, setFollowersNumber, followersNumber, }) {
    const { user } = useContext(Context);


    const PF = 'http://localhost:5000/images/';

    const [followersUser, setFollowersUser] = useState(follower.followers.includes(user?._id));

    const handleFollow = async () => {

        setFollowersUser(!followersUser);
        try {
            if (followersUser) {
                await axios.put(`/users/${follower._id}/unfollow`, { userId: user._id })
                setFollowersNumber(followersNumber - 1)

            } else {
                await axios.put(`/users/${follower._id}/follow`, { userId: user._id })
                setFollowersNumber(followersNumber + 1)
            }
        } catch (error) {
        }
    }

    return (
        <div className='profile-following-wraper'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link className='link' to={`/profile/${follower.username}`}>
                    <span><img className='following-img' src={follower.profilePicture ? PF + follower.profilePicture : User} alt="" /></span>
                </Link>
                <span style={{ fontWeight: '500', fontSize: '15px' }}>{follower.username}</span>
            </div>


            {user._id !== follower._id &&
                <button style={{ height: '40px' }} className={followersUser ? 'profile-unfollow-button' : 'profile-follow-button'} onClick={handleFollow}>{followersUser ? 'Unfollow' : 'Follow'} </button>}
        </div>
    )
}

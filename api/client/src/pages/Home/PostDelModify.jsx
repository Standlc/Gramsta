import axios from 'axios'
import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import { useParams } from 'react-router';
import './postDelModify.css'
import Delete from '../../delete.png'
import Modify from '../../editer.png'

export default function PostDelModify({ dropDown, post , setModifyF}) {
    const URLusername = useParams().username;
    const { user } = useContext(Context);

    const handleDelete = async () => {
        try {
           await axios.delete(`/posts/${post._id}`, {data : {userId: user._id}})
           window.location.replace(URLusername ? `/profile/${user.username}` : '/');
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            {dropDown &&
                <div className='home-dropdown-container'>
                    <div className="home-modify-menu" onClick={setModifyF} >
                    <img className='modify-icon' src={Modify} alt="" />
                        Modify post
                    </div>
                    <div className="home-delete-menu" onClick={handleDelete}>
                        <img className='delete-icon' src={Delete} alt="" />
                        Delete post
                    </div>
                </div>}
        </div>
    )
}

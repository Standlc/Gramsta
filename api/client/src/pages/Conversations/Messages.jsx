import React from 'react';
import './messages.css';
import User from '../../user (1).png';
import { format } from 'timeago.js'


export default function Messages({ message, own, userReceiving }) {
    const PF = 'http://localhost:5000/images/';


    return (
        <div className={own ? "message own" : "message"}>
            <img className='message-profile-picture' src={userReceiving?.profilePicture ? PF + userReceiving.profilePicture : User} alt="" />
            <div className="message-and-profile-picture">
                <p className='message-content'>{message.text}</p>

                <p className='time-message'>{format(message.createdAt)}</p>
            </div>
        </div>
    )
}

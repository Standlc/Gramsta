import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './followingsResults.css';
import Plus from '../add.png';

export default function FollowingsResults({ result, PF, User, currentUser, setConversations, conversations, setInputSearch, setUserReceiving, setCurrentChat }) {

    // const existingConversation = conversations.map((conversation) => conversation.username === result.username).includes(true);


    const [chat, setChat] = useState(conversations.filter((conversation) => {
        return conversation.username === result.username
    })[0]);

    const handleNewConversation = async (e) => {
        e.preventDefault();
        const res = await axios.post('/conversations/' + result._id, { userId: currentUser._id })
        const conversationId = res.data._id
        setConversations([{ conversationId, ...result }, ...conversations,])
        setInputSearch('');
        setCurrentChat(conversationId);
    }

    return (
        chat ?
            <Link className='link' to={'/direct/' + chat?.conversationId} >
                <div className='result-followings-search' onClick={() => setInputSearch('')}>
                    <img
                        src={result.profilePicture ? PF + result.profilePicture : User}
                        alt=""
                        className='chat-result-profile-picture' />
                    <span className='result-followings-username'>{result.username}</span>
                </div>
            </Link>
            :

            <div style={{ justifyContent: 'space-between' }} className='result-followings-search' onClick={(e) => handleNewConversation(e)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={result.profilePicture ? PF + result.profilePicture : User}
                        alt=""
                        className='chat-result-profile-picture' />
                    <span className='result-followings-username'>{result.username}</span>
                </div>

                <span className='new-conversation-span'>
                    <img className='search-conversation-plus-btn' src={Plus} alt="" />
                    <p style={{ margin: '7px' }}>NEW</p>
                </span>
            </div>
    )
}

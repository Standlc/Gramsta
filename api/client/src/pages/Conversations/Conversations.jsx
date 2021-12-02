import React, { useContext, useEffect, useRef, useState } from 'react';
import './conversations.css';
import axios from 'axios'
import User from '../../user (1).png';
import { Context } from '../../context/Context';
import FollowingsResults from './FollowingsResults';
import ConversationList from './ConversationList';
import Messages from './Messages';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import Skeleton from '../../skeletons/Skeleton';
import Back from '../../down-arrow.png';

export default function Conversations() {
    const PF = 'http://localhost:5000/images/';
    const { user: currentUser } = useContext(Context);

    const [userReceiving, setUserReceiving] = useState(null);
    const [inputSearch, setInputSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [LoadingSearch, setLoadingSearch] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();
    const [currentChat, setCurrentChat] = useState(null)
    const currentChatId = useParams().conversationId
    useEffect(() => {
        setCurrentChat(currentChatId);
    }, [useParams()])

    const [loadingMessages, setLoadingMessages] = useState(true);

    const [arrivalMessage, setArrivalMessage] = useState(null);
    //SOCKET 
    const socket = useRef()
    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket?.current.on('getMessage', message => {
            setArrivalMessage({
                messenger: message.senderId,
                text: message.text,
                createdAt: Date.now()
            })
        })
    }, [])
    useEffect(() => {
        arrivalMessage && userReceiving._id === arrivalMessage.messenger && setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat]);
    useEffect(() => {
        socket &&
            socket.current.emit('addUser', currentUser._id);
        socket.current.on('getUsers', users => {
        })
    }, [currentUser])


    //FETCH CONVERSATIONS
    useEffect(() => {
        setLoadingContacts(true)
        const fetchUserConversations = async () => {
            const res = await axios.get('/conversations/' + currentUser._id)
            setConversations(res.data.sort((p1, p2) => {
                return new Date(p2.lastMessage?.createdAt) - new Date(p1.lastMessage?.createdAt);
            }));
            setLoadingContacts(false);
        }
        fetchUserConversations();

    }, [currentUser._id]);

    //LOADIND MESSAGES
    useEffect(() => {
        setLoadingMessages(true)
        currentChat &&
            setUserReceiving(conversations.filter((conversation) => {
                return conversation.conversationId === currentChat
            })[0])
        const getMessages = async () => {
            const res = await axios.get('/messages/' + currentChat + '?number=0');
            setMessages(res.data.sort((p1, p2) => {
                return new Date(p1.createdAt) - new Date(p2.createdAt);
            }));
            setLoadingMessages(false);
        };
        currentChat && getMessages();
    }, [currentChat, conversations])

    //SEARCH
    const handleSearch = async (e) => {
        setLoadingSearch(true);
        setInputSearch(e.target.value)
        const res = await axios.get(`/users/${currentUser._id}/followings`);
        const results = res.data.filter((user) => {
            return user.username.includes(e.target.value)
        });
        setSearchResults(results);
        setLoadingSearch(false);
    }

    //SEND MESSAGE
    const handleSendMessage = async () => {

        socket.current.emit('sendMessage', {
            senderId: currentUser._id,
            receiverId: userReceiving?._id,
            text: newMessage
        });
        if (newMessage !== '' && currentChat) {
            const message = {
                messenger: currentUser._id,
                text: newMessage,
                conversationId: currentChat
            };
            const res = await axios.post('/messages', message);
            setNewMessage('')
            setMessages([...messages, res.data])
        }
    }

    //SCROLL TO LAST MESSAGE
    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messages]);


    //SLIDE TO LEFT

    const messagesContainer = useRef();
    const wholeContainer = useRef();

    const translateConv = (side) => {
        if (window.innerWidth < 700) {
            if(side === 'left'){
                 messagesContainer.current.style.transform = `translateX(-50%)` 
                 wholeContainer.current.style.zIndex = '999'
            } else{
                   messagesContainer.current.style.transform = `translateX(0%)`
                   wholeContainer.current.style.zIndex = '0'
            }
        }
    }

    return (
        <div style={{backgroundColor:'rgb(25,25,25)'}} className='sm-conversations-container' ref={wholeContainer} >


            <div className='conversations-container' ref={messagesContainer}>
                <div className='left-side-conversations'>
                    <div className="conversations-header">
                        <h2 className='conversations-header-title'>Chats</h2>
                        <input
                            className='conversations-input-search'
                            type="text"
                            value={inputSearch}
                            placeholder='Start or Search a conversation'
                            onChange={handleSearch} />
                    </div>
                    <div className="results-followings-conversations">
                        {inputSearch ? LoadingSearch ? <></> :
                            searchResults.map((result) => {
                                return  <FollowingsResults key={result._id} result={result} PF={PF} User={User} setConversations={setConversations} conversations={conversations} setInputSearch={setInputSearch} setUserReceiving={setUserReceiving} currentUser={currentUser} setCurrentChat={setCurrentChat} />
                            })
                            : loadingContacts ?
                                <Skeleton type='conversations-contacts' />
                                :
                                conversations?.map((contact) => {
                                    return <Link key={contact._id} className='link' to={'/direct/' + contact.conversationId} onClick={()=> translateConv('left')}>
                                        <ConversationList currentUser={currentUser} contact={contact} PF={PF} User={User} setUserReceiving={setUserReceiving} currentChat={currentChat} />
                                    </Link>
                                })}
                    </div>
                </div>

                <div className="right-side-conversation">


                    {currentChat &&
                            <div onClick={()=> translateConv('right')} className='current-conversation-header'>
                                <img className='sm-back-arrow-conversation' src={Back} alt="" />
                                <Link className='link' to={`/profile/${userReceiving?.username}`}>
                                    <img className='current-conversation-PP' src={userReceiving?.profilePicture ? PF + userReceiving.profilePicture : User} alt="" />
                                </Link>

                                <span className='current-conversation-username'>{userReceiving?.username}</span>
                            </div>
                    }
                    {loadingMessages ? currentChat ? <div className="all-messages"></div>
                        : <div className="all-messages"><div className='no-messages-div start'>Start a conversation !</div> </div>
                        : <div className="all-messages">
                            {currentChat && messages.length !== 0 ?
                                messages.map((message) => {
                                    return <div ref={scrollRef} key={message.createdAt} >
                                        <Messages message={message} own={message.messenger === currentUser._id} userReceiving={userReceiving} />
                                    </div>
                                })
                                : <div className='no-messages-div'>This conversations doesn't have any messages...</div>}
                        </div>}


                    <form className='input-container' >
                        <div style={{ position: 'relative', minHeight: '22px', padding: '10px', flexGrow: '1' }}>
                            <textarea
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleSendMessage()
                                    }
                                }}
                                placeholder='Write something...'
                                value={newMessage}
                                onChange={(e) => { setNewMessage(e.target.value) }}
                                className='profile-comment-input' >
                            </textarea>
                            {newMessage}
                        </div>
                        <button type='submit' className='profile-post-comment-btn' onClick={(e) => {
                            e.preventDefault()
                            handleSendMessage()
                        }}>Send</button>
                    </form>
                </div>



            </div>
        </div>
    )
}


import React from 'react'
import { format } from 'timeago.js'
import './conversationList.css'

export default function ConversationList({ contact, User, PF, currentChat }) {


    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(null);


    // useEffect(() => {
    //     setLoading(true)
    //     const friendId = conversation.members.find((memberId) => memberId !== currentUser._id)
    //     const getUser = async () => {
    //         const res = await axios.get('/users?userId=' + friendId);
    //         setUser(res.data);
    //         setLoading(false)
    //     }
    //     getUser()
    // }, [currentUser, conversation])


    // if (loading) {
    //     return <div>
    //     </div>
    // } else 
    return (
        <div className={currentChat === contact.conversationId ? 'result-followings-search clicked' : 'result-followings-search'}>
            <img
                src={contact?.profilePicture ? PF + contact.profilePicture : User}
                alt=""
                className='result-followings-profile-picture' />
            <div>
                <span className='result-followings-username'>{contact?.username}</span>
                <p className='last-message-conversation'>
                    <span>{contact.lastMessage?.username}</span>
                    
                    {contact.lastMessage ? 
                     <span> 
                         {contact.lastMessage.text.length < 19 ? contact.lastMessage.text : contact.lastMessage.text.substring(0,10) + '...'}  •  {format(contact.lastMessage?.createdAt)}
                     </span>

                    : ''}
                   
                </p>
            </div>

        </div>
    )
}

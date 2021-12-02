import './singlePost.css';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Context } from '../../context/Context'
import { Link, useParams } from 'react-router-dom';
import ProfileComment from './ProfileComment';
import SmallSinglePost from './SmallSinglePost';

export default function SinglePost() {
    const PF = 'http://localhost:5000/images/';
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const username = useParams().username;
    const URLpostId = useParams().postId;
    const [userProfile, setUserProfile] = useState([]);
    const [post, setPost] = useState([]);
    const [commentUser, setCommentUser] = useState([]);
    const [likes, setLikes] = useState();
    const [liked, setLiked] = useState();
    const [postsIds, setPostsIds] = useState();
    const [index, setIndex] = useState();
    const [next, setNext] = useState();



    useEffect(() => {
        if(URLpostId !== post?._id){
            setLoading(true)
            console.log(post._id)
        }
        
        const fetchUserPost = async () => {
            const res = await axios.get(`/posts/${URLpostId}`);
            setUserProfile(user);
            const resComments = await axios.get('/comments/users/' + res.data._id)
            setCommentUser(resComments.data);


            const resPostId = await axios.get('/posts/postId/all/' + user._id);
            const fff = resPostId.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            });
            setPostsIds(fff);

            if (resPostId.data.findIndex(x => x._id === URLpostId) + 1 < fff.length) {
                setNext(resPostId.data.findIndex(x => x._id === URLpostId) + 1)
            } else {
                setNext(resPostId.data.findIndex(x => x._id === URLpostId))
            }

            setIndex(resPostId.data.findIndex(x => x._id === URLpostId));
            setPost(res.data);
            setLoading(false);
            setLiked(res.data.likes.includes(user._id))
            setLikes(res.data.likes.length)
        }
        const fetchOtherUserAndPosts = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUserProfile(res.data);
            const resPost = await axios.get(`/posts/${URLpostId}`);
            setPost(resPost.data);
            const resComments = await axios.get('/comments/users/' + resPost.data._id)
            setCommentUser(resComments.data);
            setLoading(false);
            setLiked(resPost.data.likes.includes(user._id))
            setLikes(resPost.data.likes.length)
        }
        username === user.username ?
            fetchUserPost()
            : fetchOtherUserAndPosts();
    }, [URLpostId]);
    const smallScreen = window.innerWidth < 700

    if (loading) {
        return <></>
    } else {

        {
            if (smallScreen) {
                return <SmallSinglePost userProfile={userProfile} post={post}  commentUser={commentUser} setCommentUser={setCommentUser} />
            } else {
                return (
                    <div className='single-post-background'>
                        <Link className='link' to={`/profile/${userProfile.username}`}><div className="tap-to-hide"></div></Link>
                        <div className="profile-focus-container-container">
                            <article className='profile-focus-post-container'>
                                <img className='article-image' src={PF + post.photo} alt="" />
                            </article>
                            <ProfileComment commentUser={commentUser} setCommentUser={setCommentUser}
                                userProfile={userProfile} post={post} likes={likes} liked={liked} setLiked={setLiked} setLikes={setLikes} />
                            {/* 
                    <Link to={`/profile/${userProfile.username}/${postsIds[next]?._id}`} >
                        <button >right</button>
                    </Link> */}
                        </div>
                    </div>)
            }
        }
    }
}

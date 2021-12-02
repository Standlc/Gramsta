import React from 'react';
import './skeleton.css';
import RedLike from '../heartRed.png';

export default function Skeleton({ type }) {
    const ProfileSkeleton = () => {
        return (
            <div className='profile-page-container sk'>
                <div className='profile-header'>
                    <div className='profile-profile-picture-container'>
                        <div className='profile-profile-picture-sk'></div>
                    </div>
                    <div className="header-info">
                        <div className='profile-username-sk'></div>
                        <div className="profile-infos-sk"></div>
                    </div>
                </div>
                <div className='profile-gallerie'>
                    <div className="profile-posts-sk">
                    </div>
                    <div className="profile-posts-sk">
                    </div>
                    <div className="profile-posts-sk">
                    </div>
                    <div className="profile-posts-sk">
                    </div>
                    <div className="profile-posts-sk">
                    </div>
                    <div className="profile-posts-sk">
                    </div>
                </div>
            </div>)
    }
    const COUNTER = 2
    const HomePage = () => {
        return (
            <article className='post-container-sk'>
                <header className='article-header'>
                    <div className="author-header-info">
                        <div className="home-post-header-PP"></div>
                        <span className='home-post-header-username'></span>
                    </div>
                </header>
                <div className="image-container-sk">
                </div>
                <div className="interaction-section-sk">
                    <img className="like-btn-sk" alt='' src={RedLike} />
                    <div className="home-post-caption"></div>
                    <div className="home-post-date"></div>
                    <div className="home-post-nbr-comments"></div>
                    <div className="home-post-input"></div>
                </div>
            </article>
        )
    }
    const HomeComments = () => {
        return (
            <>
                <div className='comment-section-container-sk'>
                    <div className="comment-container-sk">
                        <div className='home-PP-sk'></div>
                        <div className="home-comment-content-sk">
                            <div className="home-comment-sk"></div>
                            <div className="home-comment-date-sk"></div>
                        </div>
                    </div>
                </div>
                <div className='comment-section-container-sk'>
                    <div className="comment-container-sk">
                        <div className='home-PP-sk'></div>
                        <div className="home-comment-content-sk">
                            <div className="home-comment-sk"></div>
                            <div className="home-comment-date-sk"></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const HomePostHeader = () => {
        return (
            <div className='article-header'>
                <div className="author-header-info">
                    <div className="home-post-header-PP"></div>
                    <span className='home-post-header-username'></span>
                </div>
            </div>
        )
    }

    const ConversationsContacts = () => {
        return (
            <div>
                <div className='contact-container-sk'>
                    <div className="contact-PP-sk"></div>
                    <div>
                        <div className="contact-username-sk"></div>
                        <div className="contact-last-message-sk"></div>
                    </div>
                </div>
                <div className='contact-container-sk'>
                    <div className="contact-PP-sk"></div>
                    <div>
                        <div className="contact-username-sk"></div>
                        <div className="contact-last-message-sk"></div>
                    </div>
                </div>
                <div className='contact-container-sk'>
                    <div className="contact-PP-sk"></div>
                    <div>
                        <div className="contact-username-sk"></div>
                        <div className="contact-last-message-sk"></div>
                    </div>
                </div>
                <div className='contact-container-sk'>
                    <div className="contact-PP-sk"></div>
                    <div>
                        <div className="contact-username-sk"></div>
                        <div className="contact-last-message-sk"></div>
                    </div>
                </div>
                <div className='contact-container-sk'>
                    <div className="contact-PP-sk"></div>
                    <div>
                        <div className="contact-username-sk"></div>
                        <div className="contact-last-message-sk"></div>
                    </div>
                </div>
            </div>
        )
    }

    const ProfileFollowersList = () => {
        return (
            <div className='profile-following-wraper'>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div className="profile-followers-list-PP"></div>
                    <div className="profile-followers-list-username"></div>
                </div>

                <div className="profile-followers-list-btn"></div>
            </div>
        )

    }


    if (type === 'profile') return <ProfileSkeleton />;
    if (type === 'home') return Array(COUNTER).fill(<HomePage />);
    if (type === 'home-post-header') return <HomePostHeader />;
    if (type === 'conversations-contacts') return <ConversationsContacts />;
    if (type === 'home-comments') return <HomeComments />;
    if (type === 'profile-followers-list') return Array(13).fill(<ProfileFollowersList />);
}

import './searchResult.css';
import React from 'react'
import { Link } from 'react-router-dom';

export default function SearchResult({ result, PF, User, setInputSearch }) {
    return (
        <Link onClick={() => { setInputSearch('') }} className='link' to={`/profile/${result.username}`}>
            <div className='result-container' >
                <img
                    src={result.profilePicture ? PF + result.profilePicture : User}
                    alt=""
                    className='result-profile-picture' />

                <span className='result-username'>{result.username}</span>
            </div>
        </Link>
    )
}

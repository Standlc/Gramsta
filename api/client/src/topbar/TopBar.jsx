import React, { useContext, useRef, useState } from 'react'
import './topbar.css';
import User from '../user (1).png'
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import Settings from '../settings.png';
import SearchResult from './SearchResult';
import MessageIcon from './message.png';
import Feed from '../icons/slideshow.png';
// import FeedSelect from '../icons/slideshow (1).png';
import UserIcon from '../icons/user (3).png';
import SettingsIcon from '../icons/settings (1).png';
import Loupe from '../icons/loupe (1).png'



export default function TopBar() {
    const { user } = useContext(Context);
    const PF = 'http://localhost:5000/images/';
    const [inputSearch, setInputSearch] = useState('');
    const [allUsers, setAllUsers] = useState({});
    const [searchResults, setSearchResults] = useState([]);


    // console.log(window.location.href)
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const res = await axios.get(`/users/users/all`);
    //         setAllUsers(res.data)
    //     }
    //     fetchUsers();
    // }, [user])

    const inputHandler = (e) => {
        setInputSearch(e.target.value);

        const results = allUsers.filter((user) => {
            return user.username.includes(e.target.value)
        });
        setSearchResults(results);
    }

    /* const inputHandler = async (e) => {
         setInputSearch(e.target.value);
         const res = await axios.get(`/users/${e.target.value}/all`);
         //  setAllUsers(res.data)
         setSearchResults(res.data);
     }
     console.log(searchResults)*/

    //INPUT ANIMATION
    // const [searchWidth, setSearchWidth] = useState('');
    const searchBar = useRef();
    const resultsContainer = useRef();
    const cancelBtn = useRef();
    const animateSearch = (show) => {
        if (show === 'show') {
            if (window.innerWidth < 700) {
                // searchBar.current.style.width = 'calc(100vw - 20px)'
                searchBar.current.focus()
                // setSearchWidth('calc(90vw - 20px)')
                resultsContainer.current.style.backgroundColor = 'white'
                resultsContainer.current.style.visibility = 'visible'
                cancelBtn.current.style.visibility = 'visible'
            }
        } else {
            resultsContainer.current.style.backgroundColor = 'rgba(255, 255, 255, 0)'
            resultsContainer.current.style.visibility = 'hidden'
            cancelBtn.current.style.visibility = 'hidden'
        }
    }

    return (
        <>
            <div className='nav-bar' onClick={() => { setInputSearch('') }} >
                <div className="navbar-elements">
                    <div className="nav-bar-left">
                        <h1 className='gramsta'>
                            <Link className='link' to='/'>Gramsta</Link>
                        </h1>
                    </div>
                    <div className="nav-bar-center" >
                        <input
                            ref={searchBar}
                            onClick={() => animateSearch('show')}
                            className="search-input"
                            type="text"
                            placeholder='Search'
                            onChange={inputHandler} />
                        <div ref={cancelBtn} onClick={() => animateSearch('hide')} className="cancel-search-absolute">Cancel</div>
                    </div>
                    <div className="nav-bar-right">
                        <Link className='link' to='/direct' >
                            <img
                                onClick={() => animateSearch('hide')}
                                src={MessageIcon}
                                alt=""
                                className='navbar-message-btn' />
                        </Link>
                        <Link className='link' to={`/profile/${user.username}`}  >
                            <img
                                onClick={() => animateSearch('hide')}
                                className='user-icon'
                                src={user.profilePicture ? PF + user.profilePicture : User}
                                alt="" />
                        </Link>
                        <Link className='link' to='/modify-profile' >
                            <img
                                onClick={() => animateSearch('hide')}
                                src={Settings}
                                alt=""
                                className='navbar-settings-btn' />
                        </Link>
                    </div>
                </div>
                <div className="results-container" ref={resultsContainer}>
                    {searchResults?.map((result) => {
                        return <SearchResult key={result._id} result={result} PF={PF} User={User} setInputSearch={setInputSearch} />
                    })}
                </div>

                {/* {inputSearch &&
                    <div className="results-container">
                        {searchResults.map((result) => {
                            return <SearchResult key={result._id} result={result} PF={PF} User={User} setInputSearch={setInputSearch} />
                        })}
                    </div>} */}
            </div>
            <div className="bottom-bar">
                <Link className='link' to='/'>
                    <img onClick={()=>animateSearch('hide')} className='bb-feed-icon' src={Feed} alt="" />
                </Link>
                <img onClick={() => animateSearch('show')} className='bb-feed-icon' src={Loupe} alt="" />
                <img className='bb-feed-icon' src={SettingsIcon} alt="" />
                <Link className='link' to={'/profile/' + user.username}>
                    <img  onClick={()=>animateSearch('hide')}className='bb-feed-icon' src={UserIcon} alt="" />
                </Link>
            </div>
        </>
    )
}




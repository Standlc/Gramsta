import React, { useState, useEffect, useContext } from "react";
import Article from "./Article";
import "./home.css";
import axios from "axios";
import { Context } from "../../context/Context";
import HomeCreatePost from "./HomeCreatePost";
import Skeleton from "../../skeletons/Skeleton";

export default function Home() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/feed/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
    };
    fetchPosts();
  }, [user._id]);

  if (loading) {
    return (
      <div className="all-home-articles">
        <HomeCreatePost />
        <Skeleton type="home" />
      </div>
    );
  } else {
    if (posts.length !== 0) {
      return (
        <div className="all-home-articles">
          <HomeCreatePost />

          {posts.map((post) => (
            <Article key={post._id} post={post} />
          ))}
        </div>
      );
    } else {
      return (
        <>
          <HomeCreatePost />
          <div className="home-no-followings-container">
            You don't follow anyone...
            <br />
            Start by posting or following some accounts !
          </div>
          {/* <div className="home-create-post">
                        <Link className='link' to='/upload'><button>Create Post</button></Link>
            </div>*/}
        </>
      );
    }
  }
}

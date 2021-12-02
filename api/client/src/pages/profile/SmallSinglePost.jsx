import React, { useContext, useEffect, useState } from "react";
import "./smallSinglePost.css";
import Down from "../../down-arrow.png";
import User from "../../user (1).png";
import Like from "../../heart.png";
import RedLike from "../../heartRed.png";
import { format } from "timeago.js";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import Menu from "../../ellipsis.png";
// import PostDelModify from './PostDelModify';
// import ModifyPost from './ModifyPost';
import CommentSection from "../Home/CommentSection";
import Skeleton from "../../skeletons/Skeleton";
import axios from "axios";
import Back from "../../down-arrow.png";
import PostDelModify from "../Home/PostDelModify";

export default function SmallSinglePost({
  post,
  userProfile,
  commentUser,
  setCommentUser,
}) {
  const { user: currentUser } = useContext(Context);
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState(post.comments.length);
  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const PF = "http://localhost:5000/images/";
  // // const [user, setUser] = useState({});
  const [commentInput, setCommentInput] = useState("");
  // const [commentUser, setCommentUser] = useState([]);
  // const [commentPosted, setCommentPosted] = useState(false);

  //FETCH POST USER
  // useEffect(() => {
  //     setLoadingUser(true)
  //     const fetchUser = async () => {
  //         const res = await axios.get(`/users?userId=${post.userId}`);
  //         setUser(res.data);
  //         setLoadingUser(false);
  //     }
  //     fetchUser();
  // }, [post.userId])
  // useEffect(() => {
  //     if (comments !== 0) {
  //         if (show || commentPosted) {
  //             setLoadingComments(true)
  //             setCommentPosted(false);
  //             const fetchCommentUser = async () => {
  //                 const res = await axios.get('/comments/users/' + post._id)
  //                 setCommentUser(res.data);
  //                 // setLoadingComments(false)
  //             }
  //             fetchCommentUser();
  //         }
  //     }
  // }, [show, commentPosted])

  const postCommentHandler = async () => {
    // e.preventDefault()
    if (commentInput.length !== 0) {
      setCommentInput("");
      const res = await axios.post("/comments/" + post._id, {
        comment: commentInput,
        userId: currentUser._id,
      });

      const {
        password,
        email,
        followers,
        followings,
        _id,
        createdAt,
        updatedAt,
        ...others
      } = currentUser;
      setCommentUser([...commentUser, { ...others, ...res.data }]);
      setComments(comments + 1);
      // console.log({ ...others, ...res.data})
    }
  };
  const likeHandler = async () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {}
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };
  const [dropDown, setDropDown] = useState(false);
  const setDropDownF = () => {
    setDropDown(!dropDown);
  };
  const [modify, setModify] = useState(false);
  const setModifyF = () => {
    setModify(!modify);
    setDropDown(false);
  };

  if (modify) {
    return (
      <></>
      // <ModifyPost PF={PF} User={User} post={post} focusPostContainer={'post-container'} setModifyF={setModifyF} />
    );
  } else
    return (
      <>
        {dropDown && (
          <div className="tap-to-hide-del" onClick={setDropDownF}></div>
        )}
        <article className="post-container small-screen">
          <header className="article-header">
            <div className="author-header-info">
              <Link
                style={{ display: "flex", alignItems: "center" }}
                to={`/profile/${userProfile.username}`}
              >
                <img className="sm-back-arrow-post" src={Back} alt="" />
                <img
                  className="author-user-icon"
                  src={
                    userProfile.profilePicture
                      ? PF + userProfile.profilePicture
                      : User
                  }
                  alt=""
                />
              </Link>
              <h3 id="author-name">{userProfile.username} </h3>
            </div>
            {userProfile.username === currentUser.username && (
              <img
                alt=""
                className="home-menu-dropdown"
                src={Menu}
                onClick={setDropDownF}
              />
            )}
          </header>
          <div className="image-container link">
            <img className="article-image" src={PF + post.photo} alt="" />
          </div>

          <div className="interaction-section small-screen-interaction-container">
            <div className="interaction">
              <button className="like-button" onClick={likeHandler}>
                <img
                  className="like-icon link"
                  src={liked ? RedLike : Like}
                  alt=""
                />
              </button>
              <span className="post-likes">{likes}</span>
            </div>
            <div className="article-description">
              <span id="author-name">{userProfile.username} </span>
              <span>{post.caption}</span>
            </div>
            <div className="article-date">
              <span className="post-date">{format(post.createdAt)}</span>
              <div
                className="article-comments-btn"
                onClick={() => setShow(!show)}
              >
                <span>
                  <img
                    className={show ? "arrow-down show" : "arrow-down"}
                    src={Down}
                    alt=""
                  />
                </span>
                <span style={{ color: "gray" }}>{comments} </span>
                <span className="comment-attribute">
                  {post.comments.length !== 1 ? "comments" : "comment"}
                </span>
              </div>
            </div>
            <div className="comment-section-container small-screen-comments-container">
              {commentUser.length === 0 && loadingComments ? (
                <Skeleton type="home-comments" />
              ) : (
                commentUser?.map((comment) => {
                  return (
                    <CommentSection
                      key={comment._id}
                      comment={comment}
                      post={post}
                    />
                  );
                })
              )}
            </div>
            <div className="comment-input-container">
              <input
                type="text"
                value={commentInput}
                className="comment-input"
                placeholder="Add a comment..."
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <span
                type="submit"
                className="post-comment-btn"
                onClick={postCommentHandler}
              >
                Post
              </span>
            </div>

            <PostDelModify
              setModifyF={setModifyF}
              setModify={setModify}
              post={post}
              dropDown={dropDown}
            />
          </div>
        </article>
      </>
    );
}

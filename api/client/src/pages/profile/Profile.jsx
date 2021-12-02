import "./profile.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import User from "../../user (1).png";
import { useParams } from "react-router";
import Settings from "../../settings.png";
import { Link } from "react-router-dom";
import FollowingsList from "./FollowingsList";
import FollowersList from "./FollowersList";
import Skeleton from "../../skeletons/Skeleton";
import Back from "../../down-arrow.png";

export default function Profile() {
  const username = useParams().username;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { user, dispatch } = useContext(Context);
  const [userProfile, setUserProfile] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState();
  const PF = "http://localhost:5000/images/";
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState([]);

  const [followingNumber, setFollowingNumber] = useState("");
  const [followersNumber, setFollowersNumber] = useState("");

  useEffect(() => {
    setLoading(true);
    setCurrentUserProfile(username === user.username);
    const fetchOtherUserAndPosts = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUserProfile(res.data);
      const resPosts = await axios.get(`/posts/profile/${res.data.username}`);

      setPosts(
        resPosts.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setFollowingNumber(res.data.followings.length);
      setFollowersNumber(res.data.followers.length);

      setLoading(false);
      setFollowing(res.data.followers.includes(user?._id));
      setFollowers(res.data.followers.length);
    };
    fetchOtherUserAndPosts();
  }, [username]);

  const handleFollow = async () => {
    setFollowers(following ? followers - 1 : followers + 1);
    setFollowing(!following);
    try {
      if (following) {
        const res = await axios.put(
          `/users/${userProfile._id}/unfollow`,
          { userId: user._id },
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        // dispatch({ type: "FOLLOW", payload: res.data })
      } else {
        const res = await axios.put(
          `/users/${userProfile._id}/follow`,
          { userId: user._id },
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        // dispatch({ type: "FOLLOW", payload: res.data })
      }
    } catch (error) {}
  };

  const [userFollowers, setUserFollowers] = useState([]);
  const [followersShow, setFollowersShow] = useState(false);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  useEffect(() => {
    setFollowersShow(false);
  }, [userProfile, username]);
  useEffect(() => {
    if (followersShow) {
      setLoadingFollowers(true);
      const fetchUserFollowers = async () => {
        const res = await axios.get("/users/" + userProfile._id + "/followers");
        setUserFollowers(res.data);
        setLoadingFollowers(false);
      };
      fetchUserFollowers();
    }
  }, [followersShow, userProfile]);

  const [userFollowings, setUserFollowings] = useState([]);
  const [followingsShow, setFollowingsShow] = useState(false);
  const [loadingFollowings, setLoadingFollowings] = useState(false);
  useEffect(() => {
    setFollowingsShow(false);
  }, [userProfile, username]);
  useEffect(() => {
    if (followingsShow === true) {
      setLoadingFollowings(true);
      const fetchUserFollowings = async () => {
        const res = await axios.get(
          "/users/" + userProfile._id + "/followings"
        );
        setUserFollowings(res.data);
        setLoadingFollowings(false);
      };
      fetchUserFollowings();
    }
  }, [followingsShow, userProfile]);

  const [translatePercentage, setTranslatePercentage] = useState(100);
  const [translateFollowers, setTranslateFollowers] = useState(100);
  useEffect(() => {
    setTranslatePercentage(100);
  }, [userProfile, username]);
  const translatePage = (page, side) => {
    if (page === "followings") {
      setFollowersShow(false);
      setFollowingsShow(!followingsShow);

      if (side === "left") {
        setTranslatePercentage(0);
      } else {
        setTranslatePercentage(100);
      }
    } else {
      setFollowersShow(!followersShow);
      setFollowingsShow(false);
      if (side === "left") {
        setTranslateFollowers(0);
      } else {
        setTranslateFollowers(100);
      }
    }
  };

  if (loading) {
    return <Skeleton type="profile" />;
  } else
    return (
      <div className="profile-page-container">
        <div className="profile-header">
          <div className="profile-profile-picture-container">
            <img
              className="profile-profile-picture"
              src={
                userProfile.profilePicture
                  ? PF + userProfile.profilePicture
                  : User
              }
              alt=""
            />
          </div>
          <div className="header-info">
            <div className="profile-username-and-follow-btn">
              <h1 id="profile-username">{userProfile.username}</h1>
              <div className="follow-button-container">
                {currentUserProfile ? (
                  <Link className="link " to="/modify-profile">
                    <div className="profile-settings-container">
                      <span id="profile-settings-span">Settings</span>
                      <img
                        src={Settings}
                        alt=""
                        className="profile-settings-btn"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="follow-button">
                    <button
                      className={
                        following
                          ? "profile-unfollow-button"
                          : "profile-follow-button"
                      }
                      onClick={handleFollow}
                    >
                      {following ? "Unfollow" : "Follow"}{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="profile-followers-posts-info">
              <div className="profile-pff" style={{ cursor: "default" }}>
                <span id="profile-numbers">{posts.length}</span>
                <span className="profile-attributes">
                  {posts.length !== 1 ? "posts" : "post"}
                </span>
              </div>

              <div style={{ position: "relative" }}>
                <div
                  className="profile-pff"
                  onClick={() => {
                    translatePage("followers", "left");
                  }}
                >
                  <p id="profile-numbers">
                    {currentUserProfile
                      ? userProfile.followers.length
                      : followers}
                  </p>
                  <p className="profile-attributes underline">
                    {userProfile.followers.length !== 1
                      ? "followers"
                      : "follower"}
                  </p>
                </div>
                {/* <div
                  className="show-followings-container"
                  // style={{
                  //   transform: "translateX(" + translateFollowers + "%)",
                  // }}
                >
                  <div className="back-arrow-header">
                    <img
                      onClick={() => {
                        translatePage("followers", "right");
                      }}
                      className="sm-back-arrow-followers"
                      src={Back}
                      alt=""
                    />
                    <div>Followers</div>
                  </div>
                  {loadingFollowers ? (
                    <Skeleton type="profile-followers-list" />
                  ) : (
                    userFollowers.map((follower) => {
                      return (
                        <FollowersList
                          key={follower._id}
                          follower={follower}
                          setFollowersNumber={setFollowersNumber}
                          followersNumber={followersNumber}
                        />
                      );
                    })
                  )}
                </div> */}
              </div>

              <div style={{ position: "relative" }}>
                <div
                  className="profile-pff"
                  onClick={() => {
                    translatePage("followings", "left");
                  }}
                >
                  <span id="profile-numbers">{followingNumber}</span>
                  <span className="profile-attributes underline">
                    {"following"}
                  </span>
                </div>
                {/* <div
                  className="show-followings-container"
                  // style={{
                  //   transform: "translateX(" + translatePercentage + "%)",
                  // }}
                >
                  <div className="back-arrow-header">
                    <img
                      onClick={() => {
                        translatePage("followings", "right");
                      }}
                      className="sm-back-arrow-followers"
                      src={Back}
                      alt=""
                    />
                    <div>Followings</div>
                  </div>
                  {loadingFollowings ? (
                    <Skeleton type="profile-followers-list" />
                  ) : (
                    userFollowings?.map((following) => {
                      return (
                        <FollowingsList
                          key={following._id}
                          following={following}
                          setFollowingNumber={setFollowingNumber}
                          followingNumber={followingNumber}
                        />
                      );
                    })
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-gallerie">
          {posts.length === 0 ? (
            currentUserProfile ? (
              <div className="profile-no-posts-container">
                You don't have any posts.
              </div>
            ) : (
              <div className="profile-no-posts-container">
                This account doesn't have any posts...
              </div>
            )
          ) : (
            posts.map((post) => (
              <Link
                className="article-profile-link"
                to={`/profile/${userProfile.username}/${post._id}`}
                key={post._id}
              >
                <img
                  className="profile-square-photo"
                  src={PF + post.photo}
                  alt=""
                />
              </Link>
            ))
          )}
        </div>
      </div>
    );
}

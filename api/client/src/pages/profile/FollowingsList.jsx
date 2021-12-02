import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import User from "../../user (1).png";
import "./followingsList.css";

export default function FollowingsList({
  following,
  setFollowingNumber,
  followingNumber,
}) {
  const { user } = useContext(Context);

  const PF = "http://localhost:5000/images/";

  const [followingUser, setFollowingUser] = useState(
    following.followers.includes(user?._id)
  );

  const handleFollow = async () => {
    setFollowingUser(!followingUser);
    try {
      if (followingUser) {
        const res = await axios.put(
          `/users/${following._id}/unfollow`,
          { userId: user._id },
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFollowingNumber(followingNumber - 1);
      } else {
        const res = await axios.put(
          `/users/${following._id}/follow`,
          { userId: user._id },
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFollowingNumber(followingNumber + 1);
      }
    } catch (error) {}
  };

  return (
    <div className="profile-following-wraper">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link className="link" to={`/profile/${following.username}`}>
          <img
            className="following-img"
            src={
              following.profilePicture ? PF + following.profilePicture : User
            }
            alt=""
          />
        </Link>
        <span style={{ fontWeight: "600", fontSize: "15px" }}>
          {following.username}
        </span>
      </div>

      {user._id !== following._id && (
        <button
          style={{ height: "40px" }}
          className={
            followingUser ? "profile-unfollow-button" : "profile-follow-button"
          }
          onClick={handleFollow}
        >
          {followingUser ? "Unfollow" : "Follow"}{" "}
        </button>
      )}
    </div>
  );
}

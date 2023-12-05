import React, { useContext, useEffect, useState } from "react";
import profile from "../images/crop-circle.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import moment from "moment";

function Single() {
  const [post, setPost] = useState();
  const getLocation = useLocation();
  const postId = getLocation.pathname.split("/")[2];
  const { currentUser } = useContext(UserContext);
  const axiosInstance = axios.create({
    baseURL: Process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const fetchpost = async () => {
      await axiosInstance
        .get(`post/${postId}`)
        .then((res) => {
          setPost(res.data[0]);
        })
        .catch((err) => console.log(err));
    };
    fetchpost();
  }, [postId]);

  const handleClick = async () => {
    await axiosInstance
      .delete(`delete/${postId}`)
      .then(() => console.log("success deleting"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="post container">
      <div className="post-body">
        <img src={post?.image} className="post-image" alt="test" />
        <div className="profile">
          <img src={profile} alt="profile" />
          <div className="user-info">
            <span>{post?.userid.username}</span>
            <p>posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser.username === post?.userid.username && (
            <div>
              <Link to="/write/3">
                <EditIcon fontSize="medium" />
              </Link>

              <Link onClick={handleClick} to="/">
                <DeleteIcon sx={{ color: red[500] }} fontSize="medium" />
              </Link>
            </div>
          )}
        </div>
        <h2>{post?.title}</h2>
        <p>{post?.content}</p>
      </div>
      <div className="post-menu">
        <Menu />
      </div>
    </div>
  );
}

export default Single;

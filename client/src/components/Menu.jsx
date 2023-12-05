import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  const [posts, setPosts] = useState([]);
  const getLocation = useLocation();
  const axiosInstance = axios.create({
    baseURL: Process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    const fetchposts = async () => {
      await axiosInstance
        .get(`posts${getLocation.search}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchposts();
  }, [getLocation]);

  return (
    <div className="menu">
      <h2>Posts you may like</h2>
      {posts.map((post) => {
        return (
          <div className="menu-post" key={post.id}>
            <h3>{post.title}</h3>
            <img src={post.image} alt="nature" />
            <div>
              <Link
                to={"/post/" + post.id}
                className="btn btn-outline-success bt-sm"
              >
                Read more
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;

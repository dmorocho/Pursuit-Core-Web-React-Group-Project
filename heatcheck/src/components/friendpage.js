import Posts from "./Feedpage/posts";
import Bio from "./Feedpage/bio";
import Reactions from "./Feedpage/reactions";
import { useHistory } from "react-router-dom";
// import NavBar from "./nav_bar";
// import UploadPost from "./uploadPost";
import Banner from "./banner";
import "../css/feedpage.css";
import React, { Component, useEffect, useState, useRef } from "react";
import axios from "axios";
let url = "http://localhost:3001/posts/2";
// let currentUser = sessionStorage.UserID;
const Friendpage = props => {
  const [allposts, setallposts] = useState([]);
  // const didMount = useRef(false);`
  const getAllposts = async () => {
    try {
      let res = await axios.get(url);
      setallposts(res.data.payload);
    } catch (error) {
      setallposts([]);
    }
  };

  useEffect(() => {
    getAllposts();
  }, []);

  return (
    <div class="parent">
      <div class="headerContainer"> </div>
      <Banner />
      <div class="feedContainer">
        <Posts allposts={allposts} getAllposts={getAllposts} />
      </div>
      <div class="bioContainer">
        <Bio />
      </div>
      {/* </div> */}
      <div class="postContainer">
        {/* <UploadPost getAllposts={getAllposts} /> */}
      </div>
      <div class="footerContainer"> </div>
    </div>
  );
};

export default Friendpage;

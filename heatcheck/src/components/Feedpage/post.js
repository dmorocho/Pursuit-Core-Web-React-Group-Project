import React, { useEffect, useState, useRef } from "react";
import Comments from "./comment";
import Reactions from "./reactions";
import axios from "axios";
import { string } from "prop-types";
import { useHistory } from "react-router-dom";

let currentUserID = sessionStorage.getItem("userID");
const styles = {
  img: {
    height: "300px",
    width: "350px",
    // borderRadius: "5%",
    objectFit: "cover"
  },

  "#userName": {
    width: "200px",
    textAlign: "start",
    fontWeight: "bolder",
    marginTop: "unset"
  },
  "#userPost": {
    display: "flex",
    marginRight: "auto"
  },
  ".post": {
    border: "1px solid",
    borderColor: "black",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
    marginBottom: "10px",
    backgroundColor: "#302E2E",
    color: "grey",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 black"
  },
  "#bannerPost": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: "pink"
  },
  "#profilepic": {
    display: "flex",
    alignSelf: "baseline",
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    border: "1px solid",
    borderColor: "black"
  },
  "#brand": {
    margin: "unset"
  },
  "#description": {
    margin: "unset"
  }
};

const Post = ({
  shoeImg,
  profilepic,
  userName,
  brand,
  description,
  release,
  postID,
  reaction,
  reactor,
  user_id,
  comments,
  tag,
  colorway,
  getAllposts
}) => {
  const [showComments, setshowComments] = useState(false);
  const history = useHistory();

  const handImgClick = () => {
    console.log(user_id);
    history.push(`/friend/${user_id}`);
  };
  const displayPost = () => {
    // let brand = brand.toUpperCase();
    return (
      <>
        <div id="bannerPost" style={styles["#bannerPost"]}>
          <div id="userPost" style={styles["#userPost"]}>
            <img
              src={profilepic}
              id="profilepic"
              style={styles["#profilepic"]}
              onClick={handImgClick}
            />

            <p id="userName" style={styles["#userName"]}>
              {userName}
            </p>
          </div>

          {user_id === currentUserID ? (
            <button id={postID} onClick={handleDelete}>
              ❌
            </button>
          ) : null}
        </div>
        <img src={shoeImg} alt={""} style={styles.img} />
        <br></br>

        {/* <Reactions id={postID} /> */}
        <p id="brand" style={styles["#brand"]}>
          <strong>Brand: </strong>
          {brand}
          <br />
          <strong>Release:</strong> {release}
        </p>
        <p style={styles["#brand"]}>
          <strong>Colorway: </strong>
          {colorway}
        </p>
        <p style={styles["#brand"]}>
          <strong>tags:</strong>#{tag}
        </p>
        <p id="description" style={styles["#description"]}>
          <strong>{userName}:</strong>
          {description}
        </p>
      </>
    );
  };
  const showModal = e => {
    if (showComments === false) {
      setshowComments(true);
    } else {
      setshowComments(false);
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    let id = e.target.id;
    try {
      let res = await axios.delete(`http://localhost:3001/posts/${id}`);
      getAllposts();
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(showComments);
  return (
    <>
      <div className="post" id={postID} style={styles[".post"]}>
        {displayPost({})}

        <button
          onClick={e => {
            showModal();
          }}
        >
          show all comments
        </button>
        <br></br>
        {showComments ? <Comments postID={postID} /> : null}

        <br></br>
      </div>
    </>
  );
};

export default Post;

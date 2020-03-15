import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Post from "./post";
let id = sessionStorage.getItem("userID");
const styles = {
  img: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    border: " 5px solid red",
    objectFit: "cover"
  }
};

const Bio = () => {
  const [currentUser, setcurrentUser] = useState([]);
  // const didMount = useRef(false);

  const getcurrentUser = async () => {
    const url = `http://localhost:3001/users/1`;

    try {
      let res = await axios.get(url);
      let user = res.data.message;
      setcurrentUser(user);
    } catch (error) {
      setcurrentUser([]);
    }
  };

  useEffect(() => {
    getcurrentUser();
  }, []);

  const userBio = () => {
    console.log(currentUser);
    return (
      <div id="bioDiv">
        <img src={currentUser.profile_pic} style={styles["img"]}></img>
        <p>
          <strong>Name: </strong>
          {currentUser.full_name}
        </p>
        <p>
          <strong>Username</strong> {currentUser.user_name}
        </p>
        <p>
          <strong>Bio:</strong> {currentUser.bio}
        </p>
        <button>profile</button>
      </div>
    );
  };

  return <div>{userBio({})}</div>;
};

export default Bio;

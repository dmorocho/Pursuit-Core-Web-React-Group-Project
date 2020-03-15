import React, { useState } from "react";
import Feedpage from "./components/Feedpage/feedPage";
import Userpage from "./components/Userpage";
import HomePage from "./components/HomePage/homePage";
import Login from "./components/HomePage/login";
import SignUp from "./components/HomePage/signup";
import NavBar from "./components/Feedpage/nav_bar"
import { Route, Switch, Redirect } from "react-router-dom";
import UploadPost from "./components/Feedpage/uploadPost";
import SearchBar from "./components/Feedpage/searchBar";
import axios from "axios";

import TrendingReactions from "./components/Feedpage/trending";

function App() {

const [loggedIn, setLoggedIn] = useState(false);
const [user, setUser] = useState();
const [error, setError] = useState(false);
const [errorText, setErrorText] = useState("")

const handleLogIn = async (email, password) => {
  try{
    let res = await axios.post("/users/login", {email});
    if(res.data.user){
      setError(false);
      
    }
  }catch(err){
    console.log(err)
  }
}

  return (
    <div className="App">
      {/* <SearchBar/> */}
      <Feedpage />
      {/* <Userpage /> */}
      {/* <HomePage /> */}
      {/* <TrendingReactions/>
      <UploadPost/> */}
    </div>
  );
}

export default App;

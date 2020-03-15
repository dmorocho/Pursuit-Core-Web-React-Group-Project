import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import axios from "axios"
import {useInput} from "../../util/customHooks.js"
import loginIcon from "./media/heatcheck.png"
import "../../css/form.scss"

const Login = (props) => {
  const history = useHistory()
  const newEmail = useInput("")
  const newPassword = useInput("")
  const [loginError, setLoginError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let email = newEmail.value;
      let password = newPassword.value;
      let res = await axios.post("http://localhost:3001/users/login", {
        email,
        password
      });
      let status = res.data.status;
      let user = res.data.payload;


      if(status === "success"){
        sessionStorage.setItem("userID", user.id)
        history.push("/feed")
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginIcon} alt="" />
        </div>
        <div className="form">
          <b>
            {loginError
              ? "The email and password combination is incorrect."
              : null}
          </b>
          <div className="form-group">
            <label htmlFor="e-mail">E-mail</label>
            <input
              type="text"
              name="e-mail"
              placeholder="E-mail"
              {...newEmail}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...newPassword}
              required
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

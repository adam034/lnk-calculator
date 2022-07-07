import React, { useState } from "react";
import icon from "../assets/lnk.png";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "../style/login-page.css";
import { useNavigate, Navigate } from "react-router-dom";
const LoginPages = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL_PRODUCTION;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    let data = {
      username: username,
      password: password,
    };
    e.preventDefault();
    if (username === "" || password === "") {
      setError(` Field tidak boleh kosong`);
    } else {
      const login = await axios.post(`${baseUrl}/login`, data);
      if (login.data.success === false) {
        setError(login.data.message);
      } else if (login.data.success === true) {
        localStorage.setItem("token", login.data.data.token);
        navigate("/calculator");
      }
    }
  };
  const handleNavigate = () => {
    navigate("/register");
  };
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={icon} alt="icon" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login Page</h1>
            <div>
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="username"
              ></input>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="password"
              ></input>
            </div>
            <button className="button-login" onClick={handleSubmit}>
              Login
            </button>
            <br></br>
            <button className="button-login" onClick={handleNavigate}>
              Register
            </button>
            {error !== "" ? <Alert variant="warning"> {error} </Alert> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPages;

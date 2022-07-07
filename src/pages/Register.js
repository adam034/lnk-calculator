import React, { useState } from "react";
import icon from "../assets/logo_user.png";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "../style/login-page.css";
import { useNavigate } from "react-router-dom";
const RegisterPages = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL_PRODUCTION;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    let data = {
      username: username,
      password: password,
      fullname: fullname
    };
    e.preventDefault();
    if (username === "" || password === "" || fullname === "") {
        setError("field tidak boleh kosong")
    } else {
        const login = await axios.post(`${baseUrl}/register`, data);
        if (login.data.success === false) {
          setError(login.data.message);
        } else if (login.data.success === true) {
            //console.log(login.data)
        navigate("/login");
        }
    }
    
  };
  const handleLogin = () => {
    navigate('/login')
  }
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
            <h1>Register Page</h1>
            <div>
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="username"
              required></input>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="password"
              required></input>
            </div>
            <div>
              <input
                type="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Fullname"
                className="password"
              required></input>
            </div>
            <button className="button-login" onClick={handleSubmit}>
              Register
            </button>
            <button className="button-login" onClick={handleLogin}>
              Login
            </button>
            {error !== "" ? <Alert variant="warning"> {error} </Alert> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPages;

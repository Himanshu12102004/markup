import React, { useContext, useEffect, useState } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "antd/es/typography/Link";
import { MyContext } from "../../App";

const Login = ({ logged, setLogged }) => {
  const navigate = useNavigate();
  const { currentImg } = useContext(MyContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault(); 
    axios
      .post(
        "http://localhost:8000/api/users/logIn",
        { email, password },
        {
          message: "login succesfull",
          method: "post",
        }
      )
      .then((response) => {
        // handle successful login
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setLogged(true);
        navigate("/");
        console.log(response.data);
      })
      .catch((error) => {
        // handle login failure
        // setError('Invalid email or password.');
        console.error("Error logging in:", error);
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="button"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <input
        className="button"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <input
        className="button"
        type="submit"
        onClick={submit}
        placeholder="submit"
      />
      <br />
      or
      <a href="/signup">Sign Up </a>
    </div>
  );
};

export default Login;

// libraries
import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// components

// styling
import "../../stylesheet/FormStyling.css";

export const Login = () => {
  const navigate = useNavigate();
  const LoginToken = localStorage.getItem("LoginToken");

  useEffect(() => {
    if (LoginToken) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (data.get("email") && data.get("password")) {
    //   localStorage.setItem("LoginToken", Date.now());
    //   navigate("/");
    // }

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <div className="main-form-page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            className="form-input"
            type="email"
            required
            placeholder="Enter your Email address..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            required
            placeholder="Enter your Password..."
          />
        </div>
        <div className="form-check">
          <div className="checkbox-div">
            <input type="checkbox" className="checkbox-input" id="rememberMe" />
            <label htmlFor="rememberMe" className="form-label">
              Remember me
            </label>
          </div>
          <div>
            <Link
              to="/forgot-password"
              className="form-label forgot-password-link"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button className="form-button">Login</button>
        <Link to="/register" className="form-toggle-link">
          Create New Account?
        </Link>
      </form>
    </div>
  );
};

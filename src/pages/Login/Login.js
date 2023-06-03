// libraries
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { ReactToastify } from "../../utility/ReactToastify";
import { ContextToken } from "../../context/LoginTokenProvider";

// styling
import "react-toastify/dist/ReactToastify.css";
import "../../stylesheet/FormStyling.css";

export const Login = () => {
  const { user, setUser, checkUser, loginAsGuest } = useContext(ContextToken);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (type) => {
    if (type === "not guest") {
      if (user.email !== "" && user.password !== "") {
        checkUser();
      } else {
        ReactToastify("Please enter your Login Email & Password", "error");
      }
    } else if (type === "guest") {
      loginAsGuest();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="main-form-page">
      <form className="form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            className="form-input"
            type="email"
            required
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email address..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-field">
            <input
              id="password"
              value={user.password}
              onChange={handleChange}
              className="form-input"
              required
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your Password..."
            />
            {showPassword ? (
              <i
                onClick={() => setShowPassword(!showPassword)}
                class="fa-regular fa-eye-slash password-icon"
              ></i>
            ) : (
              <i
                onClick={() => setShowPassword(!showPassword)}
                class="fa-regular fa-eye password-icon"
              ></i>
            )}
          </div>
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

        <button
          className="form-button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit("not guest");
          }}
        >
          Login
        </button>
        <button
          className="form-button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit("guest");
          }}
        >
          Login as Guest
        </button>
        <Link to="/register" className="form-toggle-link">
          Create New Account?
        </Link>
      </form>
    </div>
  );
};

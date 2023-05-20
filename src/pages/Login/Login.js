// libraries
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { ReactToastify } from "../../utility/ReactToastify";

// styling
import "react-toastify/dist/ReactToastify.css";
import "../../stylesheet/FormStyling.css";

export const Login = () => {
  // states
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const LoginToken = localStorage.getItem("token");
    if (LoginToken) {
      navigate("/");
    }
  }, []);

  const checkUser = async () => {
    try {
      const data = {
        email: user.email,
        password: user.password,
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.errors) {
        result.errors.map((e) => ReactToastify(e, "error"));
      } else {
        localStorage.setItem("token", result.encodedToken);
        ReactToastify("Logged in Successfully", "success");
        clearState();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginAsGuest = async () => {
    try {
      const data = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.errors) {
        result.errors.map((e) => ReactToastify(e, "error"));
      } else {
        localStorage.setItem("token", result.encodedToken);
        ReactToastify("Logged in Successfully as Guest", "success");
        clearState();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const clearState = () => {
    setUser({ email: "", password: "" });
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
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email address..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            value={user.password}
            onChange={handleChange}
            className="form-input"
            type="password"
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

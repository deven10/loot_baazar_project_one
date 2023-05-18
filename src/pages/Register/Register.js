// libraries
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// components
import { ReactToastify } from "../../utility/ReactToastify";

// styling
import "../../stylesheet/FormStyling.css";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "terms") {
      setUser({ ...user, acceptedTerms: !user.acceptedTerms });
    } else {
      setUser((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const clearState = () => {
    setUser({ email: "", password: "", acceptedTerms: false });
  };

  const registerUser = async () => {
    try {
      const data = {
        email: user.email,
        password: user.password,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (result.errors) {
        result.errors.map((e) => ReactToastify(e, "error"));
      } else {
        ReactToastify("User Created 🚀", "success");
        clearState();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email !== "" && user.password !== "" && user.acceptedTerms) {
      registerUser();
    } else {
      ReactToastify(
        "Please enter Email, Password & accept our terms to register",
        "error"
      );
    }
  };

  return (
    <div className="main-form-page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group email">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            className="form-input"
            required
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
            required
            placeholder="Enter your Password..."
          />
        </div>
        <div className="form-check">
          <div className="checkbox-div">
            <input
              onChange={handleChange}
              value={user.acceptedTerms}
              type="checkbox"
              className="checkbox-input"
              id="terms"
              checked={user.acceptedTerms}
            />
            <label htmlFor="terms" className="form-label">
              I agree all
              <Link to="/terms-conditions-policy" className="terms-conditions">
                Terms & Conditions
              </Link>
            </label>
          </div>
        </div>
        <button type="submit" className="form-button">
          Create New Account
        </button>
        <Link to="/login" className="form-toggle-link">
          Already have an account?
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

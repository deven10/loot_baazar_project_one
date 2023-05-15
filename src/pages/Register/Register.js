// libraries
import React from "react";
import { Link } from "react-router-dom";

// components

// styling
import "../../stylesheet/FormStyling.css";

export const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
            className="form-input"
            type="password"
            required
            placeholder="Enter your Password..."
          />
        </div>
        <div className="form-check">
          <div className="checkbox-div">
            <input type="checkbox" className="checkbox-input" id="terms" />
            <label htmlFor="terms" className="form-label">
              I agree all
              <Link to="/terms-conditions-policy" className="terms-conditions">
                Terms & Conditions
              </Link>
            </label>
          </div>
        </div>
        <button className="form-button">Create New Account</button>
        <Link to="/login" className="form-toggle-link">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

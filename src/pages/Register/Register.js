// libraries
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import { ReactToastify } from "../../utility/ReactToastify";

// styling
import "../../stylesheet/FormStyling.css";

export const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

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
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      const data = {
        firstName: user?.firstname,
        lastName: user?.lastname,
        email: user?.email,
        password: user?.password,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.errors) {
        result.errors.map((e) => ReactToastify(e, "error"));
      } else {
        ReactToastify("User Created 🚀", "success");
        clearState();
        localStorage.setItem("token", result.encodedToken);
        localStorage.setItem("user", JSON.stringify(result.createdUser));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password === user.confirmPassword && user.acceptedTerms) {
      registerUser();
    } else {
      if (!user.acceptedTerms) {
        ReactToastify("Please accept our terms & conditions policy", "error");
      } else {
        ReactToastify(
          "Your password is not matching with confirm password",
          "error"
        );
      }
    }
  };

  return (
    <div className="main-form-page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="form-group firstname">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            id="firstname"
            value={user.firstname}
            onChange={handleChange}
            type="text"
            className="form-input"
            required
            placeholder="Enter your firstname..."
          />
        </div>
        <div className="form-group lastname">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            id="lastname"
            value={user.lastname}
            onChange={handleChange}
            type="text"
            className="form-input"
            required
            placeholder="Enter your lastname..."
          />
        </div>
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
          <div className="password-field">
            <input
              id="password"
              value={user.password}
              onChange={handleChange}
              className="form-input"
              type={`${showPassword ? "text" : "password"}`}
              required
              placeholder="Enter your Password..."
            />
            {showPassword ? (
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="fa-regular fa-eye-slash password-icon"
              ></i>
            ) : (
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="fa-regular fa-eye password-icon"
              ></i>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Password
          </label>
          <div className="password-field">
            <input
              id="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="form-input"
              type={`${showPassword ? "text" : "password"}`}
              required
              placeholder="Re-Enter your Password..."
            />
            {showPassword ? (
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="fa-regular fa-eye-slash password-icon"
              ></i>
            ) : (
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="fa-regular fa-eye password-icon"
              ></i>
            )}
          </div>
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
              <Link className="terms-conditions">Terms & Conditions</Link>
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
    </div>
  );
};

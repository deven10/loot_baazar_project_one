import React, { createContext, useEffect, useState } from "react";
import { ReactToastify } from "../utility/ReactToastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ContextToken = createContext();

export const LoginTokenProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    const loginToken = localStorage.getItem("token");
    if (loginToken) {
      setToken(loginToken);
    }
  }, []);

  const checkUser = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const data = {
        email: user.email,
        password: user.password,
      };

      const response = await axios.post("/api/auth/login", data);
      const result = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", result.encodedToken);
        localStorage.setItem("user", JSON.stringify(result.foundUser));
        setToken(result.encodedToken);
        ReactToastify("Logged in Successfully", "success");
        clearState();
        navigate("/");
      } else {
        if (result.errors) {
          result.errors.map((e) => ReactToastify(e, "error"));
        } else {
          ReactToastify(
            "Something went wrong, please try again later!",
            "error"
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginAsGuest = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const data = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
      };

      const response = await axios.post("/api/auth/login", data);
      const result = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", result.encodedToken);
        localStorage.setItem("user", JSON.stringify(result.foundUser));
        setToken(result.encodedToken);
        ReactToastify("Logged in Successfully as Guest", "success");
        clearState();
        navigate("/");
      } else {
        if (result.errors) {
          result.errors.map((e) => ReactToastify(e, "error"));
        } else {
          ReactToastify(
            "Something went wrong, please try again later!",
            "error"
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearState = () => setUser({ email: "", password: "" });

  return (
    <ContextToken.Provider
      value={{ user, setUser, checkUser, loginAsGuest, token }}
    >
      {children}
    </ContextToken.Provider>
  );
};

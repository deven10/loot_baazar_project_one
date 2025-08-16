import React, { createContext, useEffect, useState } from "react";
import { ReactToastify } from "../utility/ReactToastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

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

  const checkUser = async (type) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      if (
        type === "not guest" &&
        (user.email.trim() === "" || user.password.trim() === "")
      ) {
        ReactToastify("Please enter your Login Email & Password", "error");
        return;
      }

      const data = {
        email: type === "guest" ? "adarshbalika@gmail.com" : user.email,
        password: type === "guest" ? "adarshbalika" : user.password,
      };

      // const response = await axios.post("/api/auth/login", data);
      const response = await axios.post(`${BASE_URL}/auth`, data);
      console.log("login response: ", response);
      const result = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", result.user.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.user.token);
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

  const clearState = () => setUser({ email: "", password: "" });

  return (
    <ContextToken.Provider value={{ user, setUser, checkUser, token }}>
      {children}
    </ContextToken.Provider>
  );
};

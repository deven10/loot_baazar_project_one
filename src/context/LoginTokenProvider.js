import React, { createContext, useEffect, useState } from "react";
import { ReactToastify } from "../utility/ReactToastify";
import { useNavigate } from "react-router-dom";

export const ContextToken = createContext();

export const LoginTokenProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    const loginToken = localStorage.getItem("token");
    console.log(loginToken);
    if (loginToken) {
      setToken(loginToken);
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
      console.log("response => ", response);
      console.log("resutlt => ", result);

      if (response.status === 200) {
        localStorage.setItem("token", result.encodedToken);
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
      console.log("response => ", response);
      console.log("resutlt => ", result);

      if (response.status === 200) {
        localStorage.setItem("token", result.encodedToken);
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
    }
  };

  const clearState = () => {
    setUser({ email: "", password: "" });
  };

  return (
    <ContextToken.Provider
      value={{ user, setUser, checkUser, loginAsGuest, token }}
    >
      {children}
    </ContextToken.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";

export const ContextToken = createContext();

export const LoginTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <ContextToken.Provider value={{ token }}>{children}</ContextToken.Provider>
  );
};

import React, { createContext, useEffect } from "react";

export const ContextToken = createContext();

export const LoginTokenProvider = ({ children }) => {
  let LoginToken;

  useEffect(() => {
    LoginToken = localStorage.getItem("LoginToken");
  }, []);

  return (
    <ContextToken.Provider value={{ LoginToken }}>
      {children}
    </ContextToken.Provider>
  );
};

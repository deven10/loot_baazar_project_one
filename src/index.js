import React from "react";
import ReactDOM from "react-dom/client";
import { makeServer } from "./server";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LoginTokenProvider, ContextToken } from "./context/LoginTokenProvider";
import { CartContext, ContextCart } from "./context/CartContext";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <LoginTokenProvider> */}
      <CartContext>
        <App />
      </CartContext>
      {/* </LoginTokenProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export { ContextToken, ContextCart };

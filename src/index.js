import React from "react";
import ReactDOM from "react-dom/client";
import { makeServer } from "./server";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginTokenProvider, ContextToken } from "./context/LoginTokenProvider";
import { CartContext, ContextCart } from "./context/CartContext";
import { WishlistContext, ContextWishlist } from "./context/WishlistContext";
import { ContextSearch, SearchContext } from "./context/SearchContext";
import { AddressContext } from "./context/AddressContext";
import { CategoriesContext } from "./context/CategoriesContext";
import { Provider } from "react-redux";
import store from "./Store/store";
import "./index.css";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LoginTokenProvider>
          <CartContext>
            <WishlistContext>
              <SearchContext>
                <AddressContext>
                  <CategoriesContext>
                    <App />
                  </CategoriesContext>
                </AddressContext>
              </SearchContext>
            </WishlistContext>
          </CartContext>
        </LoginTokenProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export { ContextToken, ContextCart, ContextWishlist, ContextSearch };

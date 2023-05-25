import { createContext, useState, useContext } from "react";
import { ReactToastify } from "../utility/ReactToastify";

import { ContextToken } from "./LoginTokenProvider";

export const ContextCart = createContext();

export const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const { token } = useContext(ContextToken);

  // API call function for adding product in cart
  const addToCart = async (item) => {
    try {
      const data = {
        product: item,
      };

      const response = await fetch("/api/user/cart", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });

      if (response.status === 201) {
        const result = await response.json();

        // main dataset
        setCart(result.cart);

        // copy dataset for all products page
        setCartProducts([...cartProducts, item]);

        ReactToastify("Product Added to Cart", "success");
      } else if (response.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this function is used to call 'add product in cart API'
  const handleCart = (product) => {
    if (token) {
      addToCart(product);
    } else {
      ReactToastify("Please login first", "error");
    }
  };

  // API call function for removing a product from cart
  const removeProductFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        setCart(result.cart);
        setCartProducts(cartProducts.filter(({ _id }) => _id !== productId));
        ReactToastify("Product Removed from Cart", "warn");
      } else if (response.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this function is used to call 'removre a product from cart API'
  const removeFromCart = (productId) => {
    if (token) {
      removeProductFromCart(productId);
    } else {
      ReactToastify("Please login first", "error");
    }
  };

  return (
    <ContextCart.Provider
      value={{
        cart,
        setCart,
        handleCart,
        removeFromCart,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </ContextCart.Provider>
  );
};

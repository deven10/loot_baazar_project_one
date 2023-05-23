import { createContext, useState } from "react";
import { ReactToastify } from "../utility/ReactToastify";

export const ContextCart = createContext();

export const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    try {
      const data = {
        product: item,
      };

      const token = localStorage.getItem("token");

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
        console.log("result => ", result);
        setCart(result.cart);
        ReactToastify("Product Added to Cart", "success");
      } else if (response.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = (product) => {
    addToCart(product);
  };

  const removeFromCart = (productId) => {};

  return (
    <ContextCart.Provider value={{ cart, handleCart, removeFromCart }}>
      {children}
    </ContextCart.Provider>
  );
};

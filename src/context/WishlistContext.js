import { createContext, useState } from "react";
import { ReactToastify } from "../utility/ReactToastify";
import { useEffect } from "react";

export const ContextWishlist = createContext();

export const WishlistContext = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = async (item) => {
    try {
      const data = {
        product: item,
      };

      const token = localStorage.getItem("token");

      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });

      if (response.status === 201) {
        const result = await response.json();
        setWishlist(result.wishlist);
        ReactToastify("Product Added to Wishlist", "success");
      } else if (response.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
  };

  const removeFromWishlist = (productId) => {};

  return (
    <ContextWishlist.Provider
      value={{ wishlist, handleWishlist, removeFromWishlist }}
    >
      {children}
    </ContextWishlist.Provider>
  );
};

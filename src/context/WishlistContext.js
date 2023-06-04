import { createContext, useState, useContext } from "react";
import { ReactToastify } from "../utility/ReactToastify";
import { ContextToken } from "./LoginTokenProvider";

export const ContextWishlist = createContext();

export const WishlistContext = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token } = useContext(ContextToken);

  // API call function for adding product in wishlist
  const addToWishlist = async (item) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const data = {
        product: item,
      };

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

        // main dataset
        setWishlist(result.wishlist);

        // copy dataset for all products page
        setWishlistProducts([...wishlistProducts, item]);

        ReactToastify("Product Added to Wishlist", "success");
      } else if (response.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // this function is used to call 'add product in wishlist API'
  const handleWishlist = (product) => {
    if (token) {
      addToWishlist(product);
    } else {
      ReactToastify("Please login first", "error");
    }
  };

  // API call function for removing a product from wishlist
  const removeProductFromWishlist = async (productId) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        setWishlist(result.wishlist);
        setWishlistProducts(
          wishlistProducts.filter(({ _id }) => _id !== productId)
        );
        ReactToastify("Product Removed from Wishlist", "warn");
      } else if (response.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // this function is used to call remove product from wishlist API
  const removeFromWishlist = (productId) => {
    if (token) {
      removeProductFromWishlist(productId);
    } else {
      ReactToastify("Please login first", "error");
    }
  };

  return (
    <ContextWishlist.Provider
      value={{
        wishlist,
        setWishlist,
        handleWishlist,
        removeFromWishlist,
        wishlistProducts,
        setWishlistProducts,
      }}
    >
      {children}
    </ContextWishlist.Provider>
  );
};

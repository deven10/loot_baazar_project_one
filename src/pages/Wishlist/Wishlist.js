import React, { useContext, useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

import "./Wishlist.css";

import { ContextWishlist } from "../../context/WishlistContext";
import { ContextCart } from "../../context/CartContext";

// lottie files
import EmptyLoader from "../../lottie-files/empty-loader.json";

const EmptyWishlist = () => {
  return (
    <div className="empty-wishlist">
      <h3>
        Your Wishlist is empty 🙁...{" "}
        <Link className="shop-now-link" to="/shop">
          Shop Now!
        </Link>
      </h3>
      <Lottie loop animationData={EmptyLoader} />
    </div>
  );
};

export const Wishlist = () => {
  const { wishlistProducts, removeFromWishlist, handleWishlist } =
    useContext(ContextWishlist);
  const { cartProducts, handleCart } = useContext(ContextCart);

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        // console.log(result.wishlist);
        // console.log("wishlistProducts = ", wishlistProducts);
        setWishlist(result.wishlist);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="main-wishlist-page default-bg-color">
      <h2 className="page-heading">My Wishlist ({wishlist.length})</h2>
      <div className="wishlist-items">
        {loading ? (
          <TailSpin
            height="50"
            width="50"
            color="#333"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            wrapperClass="loader"
            visible={true}
          />
        ) : wishlist.length > 0 ? (
          wishlist.map((product) => {
            const { id, name, image, price, liked, _id } = product;
            return (
              <div className="wishlist-item" key={_id}>
                <div className="wrapper">
                  <div className="relative-position">
                    <span className="like-icon">
                      {wishlistProducts.find((item) => item._id === _id) ? (
                        <i
                          className="fa-solid fa-heart color-red heart"
                          onClick={() => {
                            removeFromWishlist(_id);
                            getWishlist();
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fa-regular fa-heart heart"
                          onClick={() => {
                            handleWishlist(product);
                          }}
                        ></i>
                      )}
                    </span>
                    <img className="wishlist-item-img" src={image} alt={name} />
                  </div>

                  <div className="paragraphs">
                    <p className="wishlist-item-name">{name}</p>
                    <p className="wishlist-item-price">₹ {price}/-</p>
                  </div>
                </div>
                {cartProducts.find((product) => product._id === _id) ? (
                  <Link className="add-to-cart-link" to="/cart">
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={() => {
                      handleCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </div>
  );
};

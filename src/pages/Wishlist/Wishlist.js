import React, { useContext, useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

import "./Wishlist.css";

import { ContextWishlist } from "../../context/WishlistContext";

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
  // const { wishlist } = useContext(ContextWishlist);

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
        setWishlist(result.wishlist);
        console.log("wishlist => ", result.wishlist);
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
            const { id, name, image, price, liked } = product;
            return (
              <div className="wishlist-item" key={id}>
                <div className="wrapper">
                  <div className="relative-position">
                    <span className="like-icon">
                      {liked ? (
                        <i className="fa-solid fa-heart color-red heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart heart"></i>
                      )}
                    </span>
                    <img className="wishlist-item-img" src={image} alt={name} />
                  </div>

                  <div className="paragraphs">
                    <p className="wishlist-item-name">{name}</p>
                    <p className="wishlist-item-price">₹ {price}/-</p>
                  </div>
                </div>
                <button className="add-to-cart-button">Add to Cart</button>
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

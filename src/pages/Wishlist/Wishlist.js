import React, { useContext, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ContextToken } from "../../context/LoginTokenProvider";
import {
  fetchWishlist,
  removeFromWishlist,
  addToWishlist,
} from "../../Store/Features/WishlistSlice";
import { fetchCart, addToCart } from "../../Store/Features/CartSlice";

// lottie files
import EmptyLoader from "../../lottie-files/empty-loader.json";

import "./Wishlist.css";
import { stripProductName } from "../../utility/utils";

const EmptyWishlist = () => {
  return (
    <div className="empty-wishlist">
      <h3>
        Your Wishlist is empty 🙁...{" "}
        <Link className="shop-now-link" to="/shop">
          Shop Now!
        </Link>
      </h3>
      <div className="animation">
        <Lottie loop animationData={EmptyLoader} />
      </div>
    </div>
  );
};

export const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useContext(ContextToken);

  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchCart(token));
    dispatch(fetchWishlist(token));
  }, []);

  return (
    <div className="main-wishlist-page default-bg-color">
      <h2 className="page-heading">
        My Wishlist ({wishlistState.wishlist?.length})
      </h2>
      {wishlistState.loading ? (
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
      ) : wishlistState.wishlist?.length > 0 ? (
        <div className="wishlist-items">
          {wishlistState.wishlist?.map((product) => {
            const { name, image, price, _id, mrp } = product;
            return (
              <div
                className="wishlist-item flex flex-wrap custom-block block-border-radius"
                key={_id}
              >
                <div className="relative-position image-wrapper">
                  <span className="like-icon">
                    {wishlistState.wishlist?.find(
                      (item) => item._id === _id
                    ) ? (
                      <i
                        className="fa-solid fa-heart color-red heart"
                        onClick={() => {
                          dispatch(
                            removeFromWishlist({ productId: _id, token })
                          );
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-heart heart"
                        onClick={() => {
                          !token
                            ? navigate("/login")
                            : dispatch(addToWishlist({ token, product }));
                        }}
                      ></i>
                    )}
                  </span>
                  <img className="wishlist-item-img" src={image} alt={name} />
                </div>

                <div className="paragraph-wrapper">
                  <div className="paragraphs">
                    <p className="wishlist-item-name">
                      {stripProductName(name)}
                    </p>
                    <p className="flex price-wrapper gap-2 justify-center items-center py-2 price-wrapper">
                      <span className="selling-price">
                        <sup>₹</sup>
                        {price}/-
                      </span>
                      <span className="mrp-price">
                        <span>M.R.P</span>
                        <span className="line-through">₹{mrp}/- </span>
                      </span>
                    </p>
                  </div>
                  {cartState.cart?.find((product) => product._id === _id) ? (
                    <Link className="wishlist-cart-link" to="/cart">
                      Go to Cart
                    </Link>
                  ) : (
                    <button
                      className="wishlist-cart-button"
                      onClick={() => {
                        dispatch(
                          addToCart({
                            product,
                            token,
                          })
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};

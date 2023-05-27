import React, { useContext, useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

import { ContextCart } from "../../context/CartContext";
import { ContextWishlist } from "../../context/WishlistContext";
import { ContextToken } from "../../context/LoginTokenProvider";

// lottie files
import EmptyLoader from "../../lottie-files/empty-loader.json";

import "./Cart.css";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <h3>
        Your Cart is empty 🙁...{" "}
        <Link className="shop-now-link" to="/shop">
          Shop Now!
        </Link>
      </h3>
      <Lottie loop animationData={EmptyLoader} />
    </div>
  );
};

export const Cart = () => {
  const { token } = useContext(ContextToken);

  const { wishlistProducts, removeFromWishlist, handleWishlist, wishlist } =
    useContext(ContextWishlist);
  const {
    cartProducts,
    removeFromCart,
    handleCart,
    updateCart,
    cart,
    loading,
  } = useContext(ContextCart);

  const totalPrice = cart.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="cart-container default-bg-color">
      <h2 className="page-heading">My Cart ({cart.length})</h2>
      <section className="cart-main">
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
        ) : (
          <>
            <div className="cart-items">
              {cart.length > 0 ? (
                cart.map((product) => {
                  const {
                    categoryName,
                    createdAt,
                    id,
                    image,
                    inCart,
                    inWishlist,
                    liked,
                    mrp,
                    name,
                    price,
                    productRating,
                    qty,
                    updatedAt,
                    _id,
                  } = product;

                  const discountOnProduct = Math.round(
                    100 - (price / mrp) * 100
                  );

                  return (
                    <div key={_id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={image} alt={name} />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-name">{name}</p>
                        <p className="cart-item-price">
                          <span className="sale-price">₹{price}</span>{" "}
                          <span className="regular-price">₹{mrp}</span>
                        </p>
                        <p className="cart-item-offer">
                          {discountOnProduct}% off
                        </p>
                        <div className="cart-item-quantity">
                          <label className="cart-item-label">Quantity</label>
                          <div className="update-quantity">
                            <button
                              onClick={() => updateCart(_id, "decrement")}
                              className="decrease-cart-quantity cart-button"
                            >
                              -
                            </button>
                            <label className="quantity-label">{qty}</label>
                            <button
                              onClick={() => updateCart(_id, "increment")}
                              className="increase-cart-quantity cart-button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            removeFromCart(_id);
                          }}
                          className="remove-from-cart cart-item-button"
                        >
                          Remove from Cart
                        </button>
                        {wishlistProducts.find((item) => {
                          return item._id === _id;
                        }) ? (
                          ""
                        ) : (
                          <button
                            onClick={() => {
                              handleWishlist(product);
                              removeFromCart(_id);
                            }}
                            className="move-to-wishlist cart-item-button"
                          >
                            Move to Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyCart />
              )}
            </div>
            {cart.length > 0 ? (
              <div className="checkout-cart">
                <p className="checkout-cart-title">PRICE DETAILS</p>
                <p className="checkout-cart-price checkout-group">
                  <span> Price ({cart.length} item)</span>{" "}
                  <span>₹{totalPrice}</span>
                </p>
                <p className="checkout-cart-discount checkout-group">
                  <span>Discount</span> <span>-₹500</span>
                </p>
                <p className="checkout-cart-delivery-charges checkout-group">
                  <span>Delivery Charges</span> <span>₹400</span>
                </p>
                <p className="checkout-cart-discount-total-amount checkout-group">
                  <span>TOTAL AMOUNT</span>{" "}
                  <span>₹{totalPrice - 500 + 400}</span>{" "}
                </p>
                <p className="checkout-cart-offer">
                  You will save ₹699 on this order
                </p>
                <button className="place-order-button">Place Order</button>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </section>
    </div>
  );
};

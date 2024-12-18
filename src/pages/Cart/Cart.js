import React, { useContext, useEffect, useMemo } from "react";
import { TailSpin } from "react-loader-spinner";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ContextToken } from "../../context/LoginTokenProvider";
import {
  fetchCart,
  removeFromCart,
  updateCart,
} from "../../Store/Features/CartSlice";
import {
  fetchWishlist,
  addToWishlist,
} from "../../Store/Features/WishlistSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(ContextToken);

  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchCart(token));
    dispatch(fetchWishlist(token));
  }, []);

  const checkoutPrice = useMemo(() => {
    return cartState.cart.reduce(
      (acc, { mrp, price, qty }) => ({
        ...acc,
        mrpPrice: acc.mrpPrice + mrp * qty,
        actualPrice: acc.actualPrice + price * qty,
        discount: acc.discount + (mrp - price) * qty,
      }),
      { mrpPrice: 0, actualPrice: 0, discount: 0 }
    );
  }, [cartState.cart]);

  return (
    <div className="cart-container default-bg-color">
      <h2 className="page-heading">My Cart ({cartState.cart.length})</h2>
      <section className="cart-main">
        {cartState.loading ? (
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
              {cartState.cart.length > 0 ? (
                cartState.cart.map((product) => {
                  const { image, mrp, name, price, qty, _id } = product;
                  const discountOnProduct = Math.round(
                    100 - (price / mrp) * 100
                  );
                  return (
                    <div key={_id} className="cart-item custom-block">
                      <div className="cart-item-image">
                        <img src={image} alt={name} />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-name">{name}</p>
                        <p className="cart-item-price">
                          <span className="sale-price">₹{price} </span>{" "}
                          <span className="regular-price">₹{mrp} </span>
                          <span className="cart-item-offer">
                            {discountOnProduct}% off
                          </span>
                        </p>

                        <div className="cart-item-quantity">
                          <label className="cart-item-label">Quantity</label>
                          <div className="update-quantity">
                            <button
                              onClick={() => {
                                const productData = cartState.cart.filter(
                                  (prod) => _id === prod._id
                                );
                                if (productData[0].qty === 1) {
                                  dispatch(
                                    removeFromCart({
                                      token,
                                      productId: _id,
                                    })
                                  );
                                } else {
                                  dispatch(
                                    updateCart({
                                      token,
                                      productId: _id,
                                      action: {
                                        type: "decrement",
                                      },
                                    })
                                  );
                                }
                              }}
                              className="decrease-cart-quantity cart-button"
                            >
                              -
                            </button>
                            <label className="quantity-label">{qty}</label>
                            <button
                              onClick={() => {
                                dispatch(
                                  updateCart({
                                    token,
                                    productId: _id,
                                    action: {
                                      type: "increment",
                                    },
                                  })
                                );
                              }}
                              className="increase-cart-quantity cart-button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 w-100">
                          <button
                            onClick={() => {
                              dispatch(
                                removeFromCart({
                                  token,
                                  productId: _id,
                                })
                              );
                            }}
                            className="remove-from-cart cart-item-button block-border-radius"
                          >
                            Remove from Cart
                          </button>
                          {wishlistState.wishlist?.find((item) => {
                            return item._id === _id;
                          }) ? (
                            ""
                          ) : (
                            <button
                              onClick={() => {
                                dispatch(addToWishlist({ token, product }));
                                dispatch(
                                  removeFromCart({
                                    token,
                                    productId: _id,
                                  })
                                );
                              }}
                              className="move-to-wishlist cart-item-button block-border-radius"
                            >
                              Move to Wishlist
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyCart />
              )}
            </div>
            {cartState.cart.length > 0 ? (
              <div className="checkout-cart custom-block">
                <p className="checkout-cart-title">PRICE DETAILS</p>
                <p className="checkout-cart-price checkout-group">
                  <span> Price ({cartState.cart.length} item)</span>{" "}
                  <span>₹{checkoutPrice.mrpPrice}</span>
                </p>
                <p className="checkout-cart-discount checkout-group">
                  <span>Discount</span> <span>- ₹{checkoutPrice.discount}</span>
                </p>
                <p className="checkout-cart-delivery-charges checkout-group">
                  <span>Delivery Charges</span> <span>FREE</span>
                </p>
                <p className="checkout-cart-discount-total-amount checkout-group">
                  <span>TOTAL AMOUNT</span>{" "}
                  <span>₹{checkoutPrice.actualPrice}</span>{" "}
                </p>
                <p className="checkout-cart-offer text-center">
                  You will save <strong>₹{checkoutPrice.discount}</strong> on
                  this order
                </p>
                <button
                  className="button-85 mt-3 place-order-btn"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
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

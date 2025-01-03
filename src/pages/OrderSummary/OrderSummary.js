import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import axios from "axios";

import { clearCart } from "../../Store/Features/CartSlice";

import "./OrderSummary.css";

// lottie files
import orderSummary from "../../lottie-files/orderSummary.json";

export const OrderSummary = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const cartState = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState([]);
  const [animationRunning, setAnimationRunning] = useState(true);

  const finalPrice = cartData.reduce(
    (acc, { price, qty }) => acc + price * qty,
    0
  );
  const address = location?.state?.selectedAddress;

  useEffect(() => {
    setTimeout(() => {
      setAnimationRunning(false);
    }, 12000);
  }, []);

  // helper fn to delete cart items from backend server DB...
  const removeFromCart = async (productId) => {
    await axios.delete(`/api/user/cart/${productId}`, {
      headers: {
        authorization: `${token}`,
      },
    });
  };

  useEffect(() => {
    setCartData(cartState.cart);
    setTimeout(() => {
      if (cartState.cart.length > 0) {
        cartState.cart.forEach((item) => removeFromCart(item._id)); // clearing backend Server DB
        dispatch(clearCart()); // resetting redux cart state
      }
    }, 0);
  }, []);

  return (
    <>
      <h2 className="page-heading">Order Summary</h2>

      <div className="order-summary-page custom-block block-border-radius">
        {cartData.length <= 0 ? (
          <p className="empty-order-summary">
            Sorry you haven't purchased anything yet, please{" "}
            <Link to="/shop" className="underline">
              shop now!
            </Link>
          </p>
        ) : (
          <>
            {animationRunning ? (
              <div className="order-animation">
                <Lottie loop={false} animationData={orderSummary} />
              </div>
            ) : null}

            <div className="order-summary">
              <p className="thankyou-note">Thank You for placing order</p>
              <section>
                {cartData.map((product) => {
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
                  return (
                    <div className="order-item" key={_id}>
                      <img src={image} alt="" />
                      <div className="order-item-details">
                        <p className="order-item-name">{name}</p>
                        <div className="order-item-price">
                          <p className="og-price">₹{price}/-</p>
                          <p className="mrp-price">MRP: ₹{mrp}/-</p>
                        </div>
                        <div className="other-details">
                          <p>QTY: {qty}</p>
                          <p>
                            Product Rating: {productRating}{" "}
                            <i className="fa-solid fa-star star-icon"></i>
                          </p>
                        </div>
                      </div>
                      <hr className="hr-line h-[1px] text-[#737373] border-1 mt-1 mb-2 w-100" />
                    </div>
                  );
                })}
              </section>
              <div className="order-summary-details">
                <p className="delivery-address">
                  Delivery Address:{" "}
                  {`${address?.addressOne} ${address?.addressTwo} ${address?.street} ${address?.state} ${address?.pincode}`}
                </p>
                <p className="final-amount">Total Amount: ₹{finalPrice}/-</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import { ContextCart } from "../../context/CartContext";
import Lottie from "lottie-react";

import "./OrderSummary.css";

// lottie files
import orderSummary from "../../lottie-files/orderSummary.json";

export const OrderSummary = () => {
  const { cart } = useContext(ContextCart);
  const location = useLocation();
  const finalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const address = location?.state?.selectedAddress;

  return (
    <div className="container order-summary-page">
      {cart.length <= 0 ? (
        <p className="empty-order-summary">
          Sorry You have not yet purchased anything yet, please{" "}
          <Link to="/shop">shop now!</Link>
        </p>
      ) : (
        <>
          <div className="order-animation">
            <Lottie loop={false} animationData={orderSummary} />
          </div>
          <div className="row">
            <h2 className="page-heading">Order Summary</h2>
            <div className="col-md-12">
              <div className="order-summary">
                <p className="thankyou-note">Thank You for placing order</p>
                <section>
                  {cart.map((product) => {
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
                        <img src={image} />
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
                      </div>
                    );
                  })}
                </section>
                <div className="order-summary-details">
                  <p className="delivery-address">
                    Delivery Address:{" "}
                    {`${address?.addressOne} ${address?.addressTwo} ${address?.street} ${address?.state} ${address?.pincode}`}
                  </p>
                  <p className="final-amount">
                    Total Amount Paid: ₹{finalPrice}/-
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

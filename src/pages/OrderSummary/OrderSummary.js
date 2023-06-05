import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { ContextCart } from "../../context/CartContext";
import Lottie from "lottie-react";

import "./OrderSummary.css";

// lottie files
import orderSummary from "../../lottie-files/orderSummary.json";

export const OrderSummary = () => {
  const { cart } = useContext(ContextCart);
  const location = useLocation();
  console.log(location);
  console.log(cart);

  return (
    <div className="container order-summary-page">
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
                return <div key={_id}></div>;
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

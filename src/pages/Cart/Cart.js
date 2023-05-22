import React, { useContext } from "react";

import { ContextCart } from "../../context/CartContext";

import "./Cart.css";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <h2>Your Cart is empty...</h2>
    </div>
  );
};

export const Cart = () => {
  const { cart } = useContext(ContextCart);
  // console.log(cart);

  return (
    <div className="cart-container default-bg-color">
      <h2 className="page-heading">My Cart ({cart.length})</h2>
      <section className="cart-main">
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => {
              const { id, name, image, price, productRating, mrp } = item;
              return (
                <div key={id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={image} alt={name} />
                  </div>
                  <div className="cart-item-details">
                    <p className="cart-item-name">{name}</p>
                    <p className="cart-item-price">
                      <span className="sale-price">₹{price}</span>{" "}
                      <span className="regular-price">₹{mrp}</span>
                    </p>
                    <p className="cart-item-offer">50% off</p>
                    <div className="cart-item-quantity">
                      <label className="cart-item-label">Quantity</label>
                      <div className="update-quantity">
                        <button className="decrease-cart-quantity cart-button">
                          -
                        </button>
                        <label className="quantity-label">2</label>
                        <button className="increase-cart-quantity cart-button">
                          +
                        </button>
                      </div>
                    </div>
                    <button className="remove-from-cart cart-item-button">
                      Remove from Cart
                    </button>
                    <button className="move-to-wishlist cart-item-button">
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyCart />
          )}
        </div>
        <div className="checkout-cart">
          <p className="checkout-cart-title">PRICE DETAILS</p>
          <p className="checkout-cart-price checkout-group">
            <span> Price (2 item)</span> <span>₹2000</span>
          </p>
          <p className="checkout-cart-discount checkout-group">
            <span>Discount</span> <span>-₹800</span>
          </p>
          <p className="checkout-cart-delivery-charges checkout-group">
            <span>Delivery Charges</span> <span>₹399</span>
          </p>
          <p className="checkout-cart-discount-total-amount checkout-group">
            <span>TOTAL AMOUNT</span> <span>₹2499</span>{" "}
          </p>
          <p className="checkout-cart-offer">
            You will save ₹699 on this order
          </p>
          <button className="place-order-button">Place Order</button>
        </div>
      </section>
    </div>
  );
};

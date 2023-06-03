import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ContextCart } from "../../context/CartContext";
import { ContextAddress } from "../../context/AddressContext";

import "./Checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useContext(ContextCart);
  const { addresses } = useContext(ContextAddress);
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedAddress, setSelectedAddress] = useState({});

  useEffect(() => {
    console.log("add = ", selectedAddress);
  }, [selectedAddress]);

  const checkoutPrice = cart.reduce(
    (acc, { mrp, price, qty }) => ({
      ...acc,
      mrpPrice: acc.mrpPrice + mrp * qty,
      actualPrice: acc.actualPrice + price * qty,
      discount: acc.discount + (mrp - price) * qty,
    }),
    { mrpPrice: 0, actualPrice: 0, discount: 0 }
  );

  return (
    <div className="container checkout-page">
      <div className="row">
        <h2 className="page-heading">Checkout</h2>
        <div className="col-md-4 col-sm-12">
          <div
            className="select-address"
            onChange={(e) => setSelectedAddress(JSON.parse(e.target.value))}
          >
            {addresses.map((address) => {
              const { addressOne, addressTwo, id, pincode, state, street } =
                address;
              return (
                <div key={id} className="checkout-addresses">
                  <label htmlFor={`radio-${id}`}>
                    <input
                      type="radio"
                      id={`radio-${id}`}
                      name="select-address"
                      className="address-radio"
                      value={JSON.stringify(address)}
                    />
                    <div className="address-details">
                      {/* <p>
                        {user.firstName} {user.lastName}
                      </p> */}
                      <p>{addressOne}</p>
                      <p>{addressTwo}</p>
                      <p>{street}</p>
                      <p>
                        {state} - {pincode}
                      </p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="order-details">
            <hr />
            <p>Order Details</p>
            <hr />
            <div className="order-items">
              {cart.length > 0 ? (
                <div>
                  <div className="flex-div">
                    <p>Item</p>
                    <p>QTY</p>
                  </div>
                  <div className="items-in-cart">
                    {cart.map((item) => {
                      return (
                        <div className="cart-item" key={item.id}>
                          <p className="cart-item-name">{item.name}</p>
                          <p className="cart-item-qty">{item.qty}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr />
            <div className="price-details">
              <div className="checkout-cart">
                <p className="checkout-cart-title">PRICE DETAILS</p>
                <p className="checkout-cart-price checkout-group">
                  <span> Price ({cart.length} item)</span>{" "}
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
              </div>
            </div>
            <p>Deliver to</p>
            <hr />
            <div className="selected-address">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{selectedAddress?.addressOne}</p>
              <p>{selectedAddress?.addressTwo}</p>
              <p>{selectedAddress?.street}</p>
              <p>
                {selectedAddress?.state} {selectedAddress?.pincode}
              </p>
            </div>
            <button
              className="button-85 mt-3 place-order-btn"
              onClick={() => navigate("/order-summary")}
              role="button"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

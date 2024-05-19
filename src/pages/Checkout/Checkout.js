import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ContextAddress } from "../../context/AddressContext";

import "./Checkout.css";
import { ReactToastify } from "../../utility/ReactToastify";
import { fetchCart } from "../../Store/Features/CartSlice";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addresses } = useContext(ContextAddress);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const cartState = useSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState({});

  useEffect(() => {
    dispatch(fetchCart(token));
  }, []);

  const checkoutPrice = cartState.cart?.reduce(
    (acc, { mrp, price, qty }) => ({
      ...acc,
      mrpPrice: acc.mrpPrice + mrp * qty,
      actualPrice: acc.actualPrice + price * qty,
      discount: acc.discount + (mrp - price) * qty,
    }),
    { mrpPrice: 0, actualPrice: 0, discount: 0 }
  );

  const handlePlaceOrder = () => {
    if (addresses.length <= 0) {
      ReactToastify("Please add delivery address", "error");
    } else if (
      !selectedAddress.addressOne ||
      !selectedAddress.addressTwo ||
      !selectedAddress.street ||
      !selectedAddress.state ||
      !selectedAddress.pincode
    ) {
      ReactToastify("Kindly please select an address", "error");
    } else {
      navigate("/order-summary", {
        state: { selectedAddress: selectedAddress },
      });
    }
  };

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
            <button
              onClick={() => {
                navigate("/profile", { state: { address: true } });
              }}
              className="add-new-address mt-3 w-100"
            >
              Manage Address
            </button>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="order-details">
            <hr />
            <p className="order-details-heading">Order Details</p>
            <hr />
            <div className="order-items">
              {cartState.cart?.length > 0 ? (
                <div>
                  <div className="flex-div">
                    <p>Item</p>
                    <p>QTY</p>
                  </div>
                  <div className="items-in-cart">
                    {cartState.cart?.map((item) => {
                      return (
                        <div className="checkout cart-item" key={item.id}>
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
                  <span> Price ({cartState.cart?.length} item)</span>{" "}
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
            <p className="delivery-title">Shipping Address</p>
            <hr />
            <div className="selected-address">
              {selectedAddress.addressOne ? (
                <p className="address-group username">
                  <span className="address-labels">Username:</span>{" "}
                  <span className="address-values">
                    {user.firstName} {user.lastName}
                  </span>
                </p>
              ) : addresses.length > 0 ? (
                <p>No address selected</p>
              ) : (
                <p>Please add delivery address</p>
              )}
              {selectedAddress.addressOne ? (
                <p className="address-group">
                  <span className="address-labels">Address line 1: </span>
                  <span className="address-values">
                    {selectedAddress?.addressOne}
                  </span>
                </p>
              ) : (
                ""
              )}
              {selectedAddress.addressTwo ? (
                <p className="address-group">
                  <span className="address-labels">Address line 2: </span>{" "}
                  <span className="address-values">
                    {selectedAddress?.addressTwo}
                  </span>
                </p>
              ) : (
                ""
              )}
              {selectedAddress.street ? (
                <p className="address-group">
                  <span className="address-labels">Street: </span>{" "}
                  <span className="address-values">
                    {selectedAddress?.street}
                  </span>
                </p>
              ) : (
                ""
              )}
              {selectedAddress.state ? (
                <p className="address-group">
                  <span className="address-labels">State: </span>
                  <span className="address-values">
                    {selectedAddress?.state}
                  </span>
                </p>
              ) : (
                ""
              )}
              {selectedAddress.pincode ? (
                <p className="address-group">
                  <span className="address-labels">Pincode: </span>{" "}
                  <span className="address-values">
                    {selectedAddress?.pincode}
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
            <button
              className="button-85 mt-3 place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

import "./SingleProduct.css";

import { addToCart, fetchCart } from "../../Store/Features/CartSlice";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../Store/Features/WishlistSlice";
import { ContextToken } from "../../context/LoginTokenProvider";

export const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { token } = useContext(ContextToken);

  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const result = await response.json();
        setProduct(result.product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCart(token));
    dispatch(fetchWishlist(token));
    getProduct();
  }, []);

  return (
    <div className="product default-bg-color container">
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
        <div className="row" key={productId}>
          <div className="single-product-item">
            <div className="relative-position">
              <img
                className="product-image"
                src={product?.image}
                alt={product?.name}
              />
            </div>
            <div className="product-details">
              <p className="product-item-name mb-3">{product?.name}</p>
              <p className="product-item-price">
                <span className="selling-price">
                  <sup>₹</sup>
                  {product?.price}/-
                </span>
                <span className="mrp-price">
                  <span>M.R.P</span>
                  <span className="line-through">₹{product?.mrp}/- </span>
                </span>
              </p>
              <p className="product-rating mt-3 mb-4">
                Product Rating: {product?.productRating}{" "}
                <i className="fa-solid fa-star star-icon"></i>
              </p>
              <div className="single-product-buttons">
                {cartState.cart.find((product) => product._id === productId) ? (
                  <Link className="add-to-cart-link" to="/cart">
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    className="add-to-cart-btn"
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

                {wishlistState.wishlist?.find(
                  (product) => product._id === productId
                ) ? (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      dispatch(removeFromWishlist({ productId, token }));
                    }}
                  >
                    Remove from Wishlist
                  </button>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      !token
                        ? navigate("/login")
                        : dispatch(addToWishlist({ token, product }));
                    }}
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

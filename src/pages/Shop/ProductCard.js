import { Link, useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Store/Features/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { stripProductName } from "../../utility/utils";
import { useMediaQuery } from "@mui/material";
import { addToCart } from "../../Store/Features/CartSlice";
import { TailSpin } from "react-loader-spinner";
import { useEffect, useState } from "react";

export const ProductCard = ({ product, token, userId }) => {
  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);
  const lessThan575 = useMediaQuery("(max-width:575px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, name, images, price, mrp, rating } = product;
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    dispatch(
      addToCart({
        productId: _id,
        token,
        quantity: 1,
        userId,
      })
    ).finally(() => setLoading(false));
  };

  return (
    <div className="product-item custom-block block-border-radius flex">
      <div className="relative-position product-img">
        <Link to={`/shop/${_id}`} className="block product-img-wrapper">
          <img className="product-item-image" src={images[0]} alt={name} />
        </Link>
        <span className="like-icon">
          {wishlistState.wishlist?.find((product) => product._id === _id) ? (
            <i
              className="fa-solid fa-heart color-red heart"
              onClick={() => {
                dispatch(removeFromWishlist({ productId: _id, token }));
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
      </div>
      <div className="product-details">
        <p className="product-item-name mb-2">
          <Link className="product-link" to={`/shop/${_id}`}>
            {lessThan575 ? stripProductName(name) : name}
          </Link>
        </p>
        <p className="product-item-price mb-1">
          <span className="selling-price">
            <sup>₹</sup>
            {price}/-
          </span>
          <span className="mrp-price">
            <span>M.R.P</span>
            <span className="line-through">₹{mrp}/- </span>
          </span>
        </p>
        <p className="product-rating mb-3">
          Product Rating: {rating}{" "}
          <i className="fa-solid fa-star star-icon"></i>
        </p>
        {cartState.cart?.find((product) => product?.productId?._id === _id) ? (
          <Link className="add-to-cart-link" to="/cart">
            Go to Cart
          </Link>
        ) : (
          <button
            className="add-to-cart-btn"
            disabled={loading}
            onClick={handleAddToCart}
          >
            {loading ? (
              <span className="flex gap-3">
                <TailSpin
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  wrapperClass="loader"
                  visible={true}
                />
                Add to Cart
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

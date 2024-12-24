// libraries
import React, { useEffect, useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";

// components, utility functions
import { ContextSearch } from "../../context/SearchContext";
import { addToCart, fetchCart } from "../../Store/Features/CartSlice";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../Store/Features/WishlistSlice";
import { stripProductName } from "../../utility/utils";

// styling
import "./Shop.css";
import { FiltersModal } from "./FiltersModal";
import { useMediaQuery } from "@mui/material";
import { Filters } from "./Filters";
import { ContextCategories } from "../../context/CategoriesContext";

export const Shop = () => {
  const { search } = useContext(ContextSearch);

  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);

  const lessThan575 = useMediaQuery("(max-width:575px)");
  const location = useLocation();

  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [category, setCategory] = useState([]);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCategory } = useContext(ContextCategories);

  // for checking user has selected any category from homepage
  useEffect(() => {
    if (selectedCategory !== "") {
      setCategory((prev) => [...prev, selectedCategory]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (location.state === null) {
      setCategory([]);
    }
  }, [location]);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
      });

      if (response.status === 200) {
        const result = await response.json();
        setProducts(result.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    dispatch(fetchCart(token));
    dispatch(fetchWishlist(token));
  }, []);

  return (
    <div className="main-shop default-bg-color">
      <div className="filters custom-block">
        <Filters
          search={search}
          products={products}
          setProductsArray={setProductsArray}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div className="all-products">
        {loading ? null : (
          <div className="flex gap-3 mb-3 sm:sticky top-[0px] bg-[#f3f3fa] z-10 mobile-filter-wrapper">
            <button
              onClick={() => setOpen(true)}
              className="custom-block block-border-radius mobile-filters gap-2 px-3 items-center cursor-pointer"
            >
              <p>Filters</p>
              <span>
                <FaFilter />
              </span>
            </button>
            <div className="custom-block w-100 block-border-radius">
              <h2 className="page-heading px-3">
                All Products{" "}
                <span className="products-count">({productsArray.length})</span>
              </h2>
            </div>
          </div>
        )}
        <div className="products">
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
            productsArray.map((product) => {
              const { _id, name, image, price, mrp, productRating } = product;
              return (
                <div
                  className="product-item custom-block block-border-radius flex"
                  key={_id}
                >
                  <div className="relative-position product-img">
                    <Link
                      to={`/shop/${_id}`}
                      className="block product-img-wrapper"
                    >
                      <img
                        className="product-item-image"
                        src={image}
                        alt={name}
                      />
                    </Link>
                    <span className="like-icon">
                      {wishlistState.wishlist?.find(
                        (product) => product._id === _id
                      ) ? (
                        <i
                          className="fa-solid fa-heart color-red heart"
                          onClick={() => {
                            dispatch(
                              removeFromWishlist({ productId: _id, token })
                            );
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
                      Product Rating: {productRating}{" "}
                      <i className="fa-solid fa-star star-icon"></i>
                    </p>
                    {cartState.cart?.find((product) => product._id === _id) ? (
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
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <FiltersModal
        open={open}
        setOpen={setOpen}
        search={search}
        products={products}
        setProductsArray={setProductsArray}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};

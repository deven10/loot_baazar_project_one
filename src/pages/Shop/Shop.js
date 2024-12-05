// libraries
import React, { useEffect, useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components, utility functions
import { ContextSearch } from "../../context/SearchContext";
import { ContextCategories } from "../../context/CategoriesContext";
import { addToCart, fetchCart } from "../../Store/Features/CartSlice";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../Store/Features/WishlistSlice";

// styling
import "./Shop.css";

export const Shop = () => {
  const { search } = useContext(ContextSearch);
  const { selectedCategory, setSelectedCategory } =
    useContext(ContextCategories);

  const cartState = useSelector((state) => state.cart);
  const wishlistState = useSelector((state) => state.wishlist);

  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(500000);
  const [sortBy, setSortBy] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState([]);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function valuetext(value) {
    return `${value}`;
  }

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

  const handleClear = () => {
    setSortBy("");
    setRating("");
    setPriceRange(500000);
    setCategory([]);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleCategory = (e) => {
    if (e.target.checked) {
      setCategory((prev) => [...prev, e.target.value]);
    } else {
      setSelectedCategory("");
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    }
  };

  const priceFilter = (dataset) => {
    return dataset.filter(
      (product) => Number(product.price) <= Number(priceRange)
    );
  };

  const sortByFilter = (dataset) => {
    if (sortBy === "High") {
      return dataset.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "Low") {
      return dataset.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      return dataset;
    }
  };

  const ratingFilter = (dataset) => {
    if (rating === "4") {
      return dataset.filter(
        (product) => Number(product.productRating) >= Number(rating)
      );
    } else if (rating === "3") {
      return dataset.filter(
        (product) => Number(product.productRating) >= Number(rating)
      );
    } else if (rating === "2") {
      return dataset.filter(
        (product) => Number(product.productRating) >= Number(rating)
      );
    } else if (rating === "1") {
      return dataset.filter(
        (product) => Number(product.productRating) >= Number(rating)
      );
    } else {
      return dataset;
    }
  };

  const categoryFilter = (dataset) => {
    if (category.length <= 0) {
      return dataset;
    } else {
      return dataset.filter((product) =>
        category.includes(product.categoryName)
      );
    }
  };

  const sortBySearch = (dataset) => {
    if (search) {
      return dataset.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return dataset;
    }
  };

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

  const filterByPrice = priceFilter(products);
  const filterByCategory = categoryFilter(filterByPrice);
  const filterByRating = ratingFilter(filterByCategory);
  const filterBySearch = sortByFilter(filterByRating);
  const productsArray = sortBySearch(filterBySearch);

  const categories = [
    "AIO",
    "Laptops",
    "Printers",
    "Keyboard",
    "Laptop Bag",
    "Mobile",
    "Mouse",
  ];

  return (
    <div className="main-shop default-bg-color">
      <div className="container">
        <div className="row">
          <div className="col-md-3 filters custom-block">
            <div className="filter-group filters-heading p-styling">
              <p>Filters</p>
              <p>
                <button className="remove-filters-button" onClick={handleClear}>
                  Clear
                </button>
              </p>
            </div>
            <div className="filter-group filters-price-range p-styling">
              <p>Price</p>
              <Box className="price-range">
                <Slider
                  aria-label="Price"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  marks
                  step={10000}
                  min={10000}
                  max={500000}
                />
              </Box>
            </div>
            <div className="filter-group filters-category p-styling">
              <p>Category</p>
              {categories.map((singleCategory) => (
                <div className="checkbox-group" key={singleCategory}>
                  <label
                    htmlFor={singleCategory}
                    className="uppercase tracking-wide"
                  >
                    <input
                      type="checkbox"
                      value={singleCategory}
                      onChange={(e) => handleCategory(e)}
                      checked={category.includes(singleCategory)}
                      name={singleCategory}
                      id={singleCategory}
                      className="mr-2"
                    />
                    {singleCategory}
                  </label>
                </div>
              ))}
            </div>
            <div className="filter-group p-styling">
              <p>Rating</p>
              <div className="rating-filter">
                <div className="radio-rating-group">
                  <label htmlFor="rating-4">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-4"
                      value="4"
                      onChange={(e) => handleRating(e)}
                      checked={rating === "4" ? true : false}
                    />
                    4 stars & above
                  </label>
                </div>
                <div className="radio-rating-group">
                  <label htmlFor="rating-3">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-3"
                      value="3"
                      onChange={(e) => handleRating(e)}
                      checked={rating === "3" ? true : false}
                    />
                    3 stars & above
                  </label>
                </div>
                <div className="radio-rating-group">
                  <label htmlFor="rating-2">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-2"
                      value="2"
                      onChange={(e) => handleRating(e)}
                      checked={rating === "2" ? true : false}
                    />
                    2 stars & above
                  </label>
                </div>
                <div className="radio-rating-group">
                  <label htmlFor="rating-1">
                    <input
                      type="radio"
                      name="rating"
                      id="rating-1"
                      value="1"
                      onChange={(e) => handleRating(e)}
                      checked={rating === "1" ? true : false}
                    />
                    1 star & above
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-group p-styling">
              <p>Sort by</p>
              <div className="sortBy-filter">
                <div className="radio-sortby-group">
                  <label htmlFor="sortby-low">
                    <input
                      type="radio"
                      value="Low"
                      onChange={(e) => setSortBy(e.target.value)}
                      checked={sortBy === "Low" ? true : false}
                      name="sortby"
                      id="sortby-low"
                    />
                    Price - Low to High
                  </label>
                </div>
                <div className="radio-sortby-group">
                  <label htmlFor="sortby-high">
                    <input
                      type="radio"
                      value="High"
                      onChange={(e) => setSortBy(e.target.value)}
                      name="sortby"
                      id="sortby-high"
                      checked={sortBy === "High" ? true : false}
                    />
                    Price - High to Low
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 all-products pr-0">
            {loading ? null : (
              <div className="custom-block mb-3 block-border-radius">
                <h2 className="page-heading">
                  All Products{" "}
                  <span className="products-count">
                    ({productsArray.length})
                  </span>
                </h2>
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
                  const { _id, name, image, price, mrp, productRating } =
                    product;
                  return (
                    <div
                      className="product-item custom-block block-border-radius flex gap-4"
                      key={_id}
                    >
                      <div className="relative-position product-img">
                        <Link
                          to={`/shop/${_id}`}
                          className="w-[250px] h-[250px] block"
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
                            {name}
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
                        {cartState.cart?.find(
                          (product) => product._id === _id
                        ) ? (
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
        </div>
      </div>
    </div>
  );
};

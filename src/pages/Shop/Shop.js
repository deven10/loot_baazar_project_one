// libraries
import React, { useEffect, useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";

// components, utility functions
import { ReactToastify } from "../../utility/ReactToastify";
import { ContextCart } from "../../context/CartContext";
import { ContextWishlist } from "../../context/WishlistContext";

// styling
import "./Shop.css";

export const Shop = () => {
  const { handleCart, removeFromCart } = useContext(ContextCart);
  const { handleWishlist, removeFromWishlist } = useContext(ContextWishlist);

  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState(500000);
  const [sortBy, setSortBy] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState([]);

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

  useEffect(() => getProducts, []);

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

  const filterByPrice = priceFilter(products);
  const filterByCategory = categoryFilter(filterByPrice);
  const filterByRating = ratingFilter(filterByCategory);
  const productsArray = sortByFilter(filterByRating);
  console.log(productsArray);

  return (
    <div className="main-shop default-bg-color">
      <div className="container">
        <div className="row">
          <div className="col-md-3 filters">
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
              <div className="checkbox-group">
                <label htmlFor="AIO">
                  <input
                    type="checkbox"
                    value="AIO"
                    onChange={(e) => handleCategory(e)}
                    checked={category.includes("AIO")}
                    name="AIO"
                    id="AIO"
                  />
                  ALL IN ONE
                </label>
              </div>
              <div className="checkbox-group">
                <label htmlFor="Laptops">
                  <input
                    type="checkbox"
                    value="Laptops"
                    onChange={(e) => handleCategory(e)}
                    checked={category.includes("Laptops")}
                    name="Laptops"
                    id="Laptops"
                  />
                  LAPTOPS
                </label>
              </div>
              <div className="checkbox-group">
                <label htmlFor="Printers">
                  <input
                    type="checkbox"
                    value="Printers"
                    onChange={(e) => handleCategory(e)}
                    checked={category.includes("Printers")}
                    name="Printers"
                    id="Printers"
                  />
                  PRINTERS
                </label>
              </div>
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
          <div className="col-md-9 all-products">
            <h3 className="page-heading">
              All Products{" "}
              <span className="products-count">
                ({productsArray.length} products)
              </span>
            </h3>
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
                  const {
                    id,
                    name,
                    image,
                    price,
                    liked,
                    mrp,
                    categoryName,
                    productRating,
                    inCart,
                    inWishlist,
                  } = product;
                  return (
                    <div className="product-item" key={id}>
                      <div className="relative-position product-img">
                        <Link to={`/shop/${id}`}>
                          <img
                            className="product-item-image"
                            src={image}
                            alt={name}
                          />
                        </Link>
                        <span className="like-icon">
                          {inWishlist ? (
                            <i
                              className="fa-solid fa-heart color-red heart"
                              onClick={() => {
                                removeFromWishlist(id);
                              }}
                            ></i>
                          ) : (
                            <i
                              className="fa-regular fa-heart heart"
                              onClick={() => {
                                handleWishlist(product);
                                product.inWishlist = true;
                              }}
                            ></i>
                          )}
                        </span>
                      </div>
                      <div className="product-details">
                        <p className="product-item-name mb-3">
                          <Link className="product-link" to={`/shop/${id}`}>
                            {name}
                          </Link>
                        </p>
                        <p className="product-item-price">
                          <span className="selling-price">
                            <sup>₹</sup>
                            {price}/-
                          </span>
                          <span className="mrp-price">
                            <span>M.R.P</span>
                            <span className="line-through">₹{mrp}/- </span>
                          </span>
                        </p>
                        <p className="product-rating mt-3 mb-4">
                          Product Rating: {productRating}{" "}
                          <i className="fa-solid fa-star star-icon"></i>
                        </p>
                        {inCart ? (
                          <Link className="add-to-cart-link" to="/cart">
                            Go to Cart
                          </Link>
                        ) : (
                          <button
                            className="add-to-cart-btn"
                            onClick={() => {
                              handleCart(product);
                              product.inCart = true;
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

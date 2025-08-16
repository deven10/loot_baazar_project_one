import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ContextCategories } from "../../context/CategoriesContext";
import Skeleton from "react-loading-skeleton";

export const Filters = ({
  search,
  products,
  setProductsArray,
  category,
  setCategory,
  categories,
}) => {
  const [priceRange, setPriceRange] = useState(500000);
  const [sortBy, setSortBy] = useState("");
  const [rating, setRating] = useState("");

  const { setSelectedCategory } = useContext(ContextCategories);

  const handleClear = () => {
    setSortBy("");
    setRating("");
    setPriceRange(500000);
    setCategory([]);
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleCategory = (e) => {
    if (e.target.checked) {
      setCategory((prev) => [...prev, e.target.value]);
    } else {
      setSelectedCategory("");
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    }
  };

  const handleRating = (e) => {
    setRating(e.target.value);
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
        (product) => Number(product.rating) >= Number(rating)
      );
    } else if (rating === "3") {
      return dataset.filter(
        (product) => Number(product.rating) >= Number(rating)
      );
    } else if (rating === "2") {
      return dataset.filter(
        (product) => Number(product.rating) >= Number(rating)
      );
    } else if (rating === "1") {
      return dataset.filter(
        (product) => Number(product.rating) >= Number(rating)
      );
    } else {
      return dataset;
    }
  };

  const categoryFilter = (dataset) => {
    if (category?.length <= 0) {
      return dataset;
    } else {
      return dataset.filter((product) =>
        category.some((item) => product?.category.includes(item))
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

  useEffect(() => {
    const filterByPrice = priceFilter(products);
    const filterByCategory = categoryFilter(filterByPrice);
    const filterByRating = ratingFilter(filterByCategory);
    const filterBySearch = sortByFilter(filterByRating);
    const productsToShow = sortBySearch(filterBySearch);
    setProductsArray(() => productsToShow);
  }, [products, category, priceRange, sortBy, search, rating]);

  return (
    <div>
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

      {categories.loading || categories?.categories?.length > 0 ? (
        <div className="filter-group filters-category p-styling">
          <p>Category</p>

          {categories.loading
            ? [1, 2, 3, 4].map((category) => (
                <span key={category}>
                  <Skeleton height={25} width={100} />
                </span>
              ))
            : categories?.categories?.map((singleCategory) => (
                <div className="checkbox-group" key={singleCategory._id}>
                  <label
                    htmlFor={singleCategory._id}
                    className="uppercase tracking-wide"
                  >
                    <input
                      type="checkbox"
                      value={singleCategory.name}
                      onChange={(e) => handleCategory(e)}
                      checked={category.includes(singleCategory.name)}
                      name={singleCategory.name}
                      id={singleCategory._id}
                      className="mr-2"
                    />
                    {singleCategory.name}
                  </label>
                </div>
              ))}
        </div>
      ) : null}

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
  );
};

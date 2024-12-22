import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { categories } from "../../utility/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  // bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  //   p: 4,
};

export const FiltersModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen((prev) => !prev);

  return (
    <div className="filters-modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="custom-block block-border-radius px-5 py-4"
          >
            <div className="">
              <div className="filter-group filters-heading p-styling">
                <p>Filters</p>
                <p>
                  <button
                    className="remove-filters-button"
                    //  onClick={handleClear}
                  >
                    Clear
                  </button>
                </p>
              </div>
              <div className="filter-group filters-price-range p-styling">
                <p>Price</p>
                <Box className="price-range">
                  <Slider
                    aria-label="Price"
                    //   value={priceRange}
                    //   onChange={(e) => setPriceRange(e.target.value)}
                    //   getAriaValueText={valuetext}
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
                        //   value={singleCategory}
                        //   onChange={(e) => handleCategory(e)}
                        //   checked={category.includes(singleCategory)}
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
                        //   onChange={(e) => handleRating(e)}
                        //   checked={rating === "4" ? true : false}
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
                        //   onChange={(e) => handleRating(e)}
                        //   checked={rating === "3" ? true : false}
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
                        //   onChange={(e) => handleRating(e)}
                        //   checked={rating === "2" ? true : false}
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
                        //   onChange={(e) => handleRating(e)}
                        //   checked={rating === "1" ? true : false}
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
                        //   onChange={(e) => setSortBy(e.target.value)}
                        //   checked={sortBy === "Low" ? true : false}
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
                        //   onChange={(e) => setSortBy(e.target.value)}
                        name="sortby"
                        id="sortby-high"
                        //   checked={sortBy === "High" ? true : false}
                      />
                      Price - High to Low
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className="border-1 px-3 py-2 add-to-cart-link float-right">
              Close
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

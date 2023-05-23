import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactToastify } from "../../utility/ReactToastify";

// importing images
import img1 from "../../images/home-img-1.png";
import img2 from "../../images/home-img-2.png";
import img4 from "../../images/home-img-4.jpg";
import img5 from "../../images/home-img-5.png";

import "./Home.css";

export const Home = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
      });

      if (response.status === 200) {
        const result = await response.json();
        setCategories(result.categories);
      } else {
        if (response.status === 500) {
          ReactToastify("Something went wrong", "error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="main default-bg-color">
      <section className="slider">
        <div
          id="carouselExampleControlsNoTouching"
          className="carousel slide"
          data-bs-touch="true"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" /*data-bs-interval="2000"*/>
              <Link to="/shop">
                <img
                  src={img1}
                  className="d-block w-100 slider-img"
                  alt="Slider first"
                />
              </Link>
            </div>
            <div className="carousel-item" /*data-bs-interval="2000"*/>
              <Link to="/shop">
                <img
                  src={img2}
                  className="d-block w-100 slider-img"
                  alt="Slider second"
                />
              </Link>
            </div>
            <div className="carousel-item" /*data-bs-interval="2000"*/>
              <Link to="/shop">
                <img
                  src={img4}
                  className="d-block w-100 slider-img"
                  alt="Slider third"
                />
              </Link>
            </div>
            <div className="carousel-item" /*data-bs-interval="2000"*/>
              <Link to="/shop">
                <img
                  src={img5}
                  className="d-block w-100 slider-img"
                  alt="Slider fourth"
                />
              </Link>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-parent">
          {categories?.map((category) => {
            const { image, description, categoryName, _id } = category;
            return (
              <div className="category" key={_id}>
                <img src={image} alt={description} />
                <p>{categoryName}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

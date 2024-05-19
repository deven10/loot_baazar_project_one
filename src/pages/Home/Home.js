import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { ContextCategories } from "../../context/CategoriesContext";
import { fetchCategories } from "../../Store/Features/CategoriesSlice";

// importing images
import img1 from "../../images/home-img-1.png";
import img2 from "../../images/home-img-2.png";
import img4 from "../../images/home-img-4.jpg";
import img5 from "../../images/home-img-5.png";

import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoriesState = useSelector((state) => state.categories);
  const { setSelectedCategory } = useContext(ContextCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const bannerImagesData = [
    { src: img1, alt: "first" },
    { src: img2, alt: "second" },
    { src: img4, alt: "third" },
    { src: img5, alt: "fourth" },
  ];

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
            {bannerImagesData.map((data) => {
              return (
                <div
                  key={data.alt}
                  className="carousel-item active"
                  data-bs-interval="2000"
                >
                  <Link to="/shop">
                    <img
                      src={data.src}
                      className="d-block w-100 slider-img"
                      alt={`Slider ${data.alt}`}
                      loading="lazy"
                    />
                  </Link>
                </div>
              );
            })}
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
          {categoriesState.loading ? (
            <>
              <Skeleton height={250} width={350} />
              <Skeleton height={250} width={350} />
              <Skeleton height={250} width={350} />
            </>
          ) : (
            categoriesState.categories?.map((category) => {
              const { image, description, categoryName, _id } = category;
              return (
                <div
                  onClick={() => {
                    navigate("/shop", { state: { location: "Home" } });
                    setSelectedCategory(() => category.categoryName);
                  }}
                  className="category"
                  key={_id}
                >
                  <img src={image} alt={description} loading="lazy" />
                  <p>{categoryName}</p>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

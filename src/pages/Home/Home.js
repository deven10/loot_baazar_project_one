import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";

import { ContextCategories } from "../../context/CategoriesContext";
import { fetchCategories } from "../../Store/Features/CategoriesSlice";
import CategorySlider from "./CategorySlider";

import "./Home.css";
import { BannerSlider } from "./BannerSlider";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoriesState = useSelector((state) => state.categories);
  const { setSelectedCategory } = useContext(ContextCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="main default-bg-color">
      <BannerSlider />

      <section className="categories">
        <CategorySlider
          categoriesState={categoriesState}
          setSelectedCategory={setSelectedCategory}
        />
        {/* <h2>Shop by Category</h2>
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
        </div> */}
      </section>
    </div>
  );
};

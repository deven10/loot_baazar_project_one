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
      </section>
    </div>
  );
};

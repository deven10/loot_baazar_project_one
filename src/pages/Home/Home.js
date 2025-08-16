import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContextCategories } from "../../context/CategoriesContext";
import { fetchCategories } from "../../Store/Features/CategoriesSlice";
import CategorySlider from "./CategorySlider";

import "./Home.css";
import { BannerSlider } from "./BannerSlider";

export const Home = () => {
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

// libraries
import React, { useEffect, useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";

// components, utility functions
import { ContextSearch } from "../../context/SearchContext";
import { fetchWishlist } from "../../Store/Features/WishlistSlice";

// styling
import "./Shop.css";
import { FiltersModal } from "./FiltersModal";
import { Filters } from "./Filters";
import { ContextCategories } from "../../context/CategoriesContext";
import axios from "axios";
import { fetchCategories } from "../../Store/Features/CategoriesSlice";
import { BASE_URL } from "../../config";
import { ProductCard } from "./ProductCard";

export const Shop = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [category, setCategory] = useState([]);

  const { search } = useContext(ContextSearch);
  const { selectedCategory } = useContext(ContextCategories);
  const categoriesState = useSelector((state) => state.categories);

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
      const response = await axios.get(`${BASE_URL}/product`);
      if (response.status === 200) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    if (user && user?._id) {
      dispatch(fetchWishlist(token));
    }
  }, []);

  useEffect(() => {
    if (categoriesState?.categories?.length <= 0) {
      dispatch(fetchCategories());
    }
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
          categories={categoriesState}
        />
      </div>
      <div className="all-products">
        {loading ? null : (
          <div className="flex gap-3 mb-3 bg-[#f3f3fa] z-10 mobile-filter-wrapper">
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
              return (
                <React.Fragment key={product._id}>
                  <ProductCard
                    product={product}
                    userId={user?._id}
                    token={user?.token}
                  />
                </React.Fragment>
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
        categories={categoriesState}
      />
    </div>
  );
};

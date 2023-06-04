import React, { useState, useEffect, createContext } from "react";
import { ReactToastify } from "../utility/ReactToastify";

export const ContextCategories = createContext();

export const CategoriesContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
    <ContextCategories.Provider
      value={{ categories, selectedCategory, setSelectedCategory }}
    >
      {children}
    </ContextCategories.Provider>
  );
};

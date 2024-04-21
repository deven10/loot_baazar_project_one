import React, { useState, createContext } from "react";

export const ContextCategories = createContext();

export const CategoriesContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <ContextCategories.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ContextCategories.Provider>
  );
};

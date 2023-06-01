import { createContext, useState } from "react";

export const ContextSearch = createContext();

export const SearchContext = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <ContextSearch.Provider value={{ search, setSearch }}>
      {children}
    </ContextSearch.Provider>
  );
};

import { configureStore } from "@reduxjs/toolkit";
// import { eventSlice } from "../Features/eventSlice";
import { categoriesSlice } from "./Features/CategoriesSlice";

export default configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    // volunteers: volunteerSlice.reducer,
  },
});

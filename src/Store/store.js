import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./Features/CartSlice";
import { categoriesSlice } from "./Features/CategoriesSlice";
import { wishlistSlice } from "./Features/WishlistSlice";

export default configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});

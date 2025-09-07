// api.js
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/Features/CartSlice";
import { clearWishlist } from "../Store/Features/WishlistSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Interceptor for responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      useDispatch(clearCart());
      useDispatch(clearWishlist());
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;

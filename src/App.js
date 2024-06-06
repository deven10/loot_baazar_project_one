// libraries
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { ToastContainer } from "react-toastify";

// component / pages
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { Shop } from "./pages/Shop/Shop";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { SingleProduct } from "./pages/Shop/SingleProduct";
import { Profile } from "./pages/Profile/Profile";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { TestApi } from "./pages/Mockman/TestApi";
import { Checkout } from "./pages/Checkout/Checkout";
import { OrderSummary } from "./pages/OrderSummary/OrderSummary";

// lottie files
import HomeLoading from "./lottie-files/home-loading.json";

// private routes
import { IfLoggedIn } from "./components/PrivateRoutes/IfLoggedIn";

// styling
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [abc, setAbc] = useState(true);
  const location = useLocation();

  setTimeout(() => {
    setAbc(false);
  }, 2500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      {abc ? (
        <div className="loading-animation default-bg-color">
          <div className="animation">
            <Lottie loop animationData={HomeLoading} />
          </div>
        </div>
      ) : (
        <div className="default-bg-color">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<SingleProduct />} />
            <Route path="/mockman" element={<TestApi />} />

            <Route element={<IfLoggedIn />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-summary" element={<OrderSummary />} />
            </Route>
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default App;

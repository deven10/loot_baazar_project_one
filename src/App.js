// libraries
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Lottie from "lottie-react";

// component / pages
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { Shop } from "./pages/Shop/Shop";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { SingleProduct } from "./pages/Shop/SingleProduct";
import { Profile } from "./pages/Profile/Profile";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";

// lottie files
import HomeLoading from "./lottie-files/home-loading.json";

// private routes
import { IfLoggedIn } from "./components/PrivateRoutes/IfLoggedIn";

// styling
import "./App.css";

function App() {
  const [abc, setAbc] = useState(true);

  setTimeout(() => {
    setAbc(false);
  }, 2500);

  return (
    <div className="App">
      {abc ? (
        <div className="loading-animation default-bg-color">
          <div className="animation">
            <Lottie loop animationData={HomeLoading} />
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* if logint token private routings */}
            {/* <Route element={<IfLoggedIn />}> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<SingleProduct />} />
            <Route path="/profile" element={<Profile />} />
            {/* </Route> */}
            {/* if login token private routing ended */}
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Logo } from "../Logo";
import { Socials } from "./Socials";
import { QuickLinks } from "./QuickLinks";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import "./Footer.css";
import { ContextCategories } from "../../context/CategoriesContext";
import { categories } from "../../utility/utils";

export const NewFooter = () => {
  const { setSelectedCategory } = useContext(ContextCategories);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="custom-block block-border-radius new-footer flex flex-col">
      <div className="flex justify-between items-center mb-3">
        {/* logo */}
        <Logo />
        {/* social links */}
        <Socials />
      </div>
      <div className="flex justify-between items-center mb-5">
        {/* quick links */}
        <QuickLinks />

        {/* address, phone, email */}
        <div className="flex flex-1 flex-col gap-3">
          <p className="flex items-center gap-2 text-[15px]">
            <FaLocationDot /> Borivali E, Mumbai - 66
          </p>
          <p className="flex items-center gap-2 text-[15px]">
            <FaPhoneAlt /> +91 8355916480
          </p>
          <p className="flex items-center gap-2 text-[15px]">
            <IoMail /> umraniadeven10@gmail.com
          </p>
        </div>

        {/* categories tags */}
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-medium">Categories</p>
          <div className="flex flex-wrap gap-x-4 gap-y-3 items-center">
            {categories.map((category) => (
              <span
                key={category}
                onClick={() => {
                  navigate("/shop", { state: { location: "Home" } });
                  setSelectedCategory(() => category);
                }}
                className="px-3 cursor-pointer py-1 tracking-wide text-[14px] bg-[#dfdfdf] block-border-radius"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>&copy; {currentYear}. All rights reserved.</p>
        <p>
          Designed by{" "}
          <Link
            className="underline"
            to="https://deven-portfolio.netlify.app/"
            target="_blank"
          >
            Deven Umrania
          </Link>
        </p>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12 center">
            <div className="quick-links">
              <p>Quick Links</p>
              <ul>
                <li>
                  <Link to="/shop" className="footer-link">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="footer-link">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="footer-link">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="footer-link">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12 center">
            <div className="contact-me">
              <p>Contact Me</p>
              <ul>
                <li>
                  <Link
                    to="https://github.com/deven10"
                    target="_blank"
                    className="footer-link"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.linkedin.com/in/umraniadeven/"
                    target="_blank"
                    className="footer-link"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://deven-portfolio.netlify.app/"
                    target="_blank"
                    className="footer-link"
                  >
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

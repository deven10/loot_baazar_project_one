import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

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

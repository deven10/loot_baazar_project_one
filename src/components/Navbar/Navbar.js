// libraries
import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// components
import { ContextCart } from "../../context/CartContext";
import { ContextWishlist } from "../../context/WishlistContext";
import { ContextToken } from "../../context/LoginTokenProvider";

// styling
import "./Navbar.css";
import "react-tooltip/dist/react-tooltip.css";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      Loot Baazar 🚀
    </Link>
  );
};

const Searchbar = () => {
  return (
    <input type="text" placeholder="Search Product..." className="searchbar" />
  );
};

const Nav = () => {
  const { cart, setCart } = useContext(ContextCart);
  const { wishlist, setWishlist } = useContext(ContextWishlist);

  const { token } = useContext(ContextToken);
  const navigate = useNavigate();

  const ThreeDots = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSignOut = () => {
      localStorage.clear();
      setCart([]);
      setWishlist([]);
      navigate("/");
      window.location.reload();
    };

    return (
      <>
        <div className="three-dots">
          <IconButton
            className="more-options"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // PaperProps={{
            //   style: {
            //     width: "",
            //   },
            // }}
          >
            <MenuItem onClick={handleClose}>
              <Link className="profile-link" to="/profile">
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <button className="logout-button" onClick={handleSignOut}>
                Logout
              </button>
            </MenuItem>
          </Menu>
        </div>
      </>
    );
  };

  return (
    <div className="nav-container">
      <div className="nav-links">
        <Tooltip id="Shop-tooltip" />
        <NavLink
          data-tooltip-id="Shop-tooltip"
          data-tooltip-content="Shop"
          data-tooltip-place="bottom"
          className="navLink"
          to="/shop"
        >
          <i className="fa-solid fa-shop"></i>
        </NavLink>

        <Tooltip id="Wishlist-tooltip" />
        <NavLink
          data-tooltip-id="Wishlist-tooltip"
          data-tooltip-content="Wishlist"
          data-tooltip-place="bottom"
          className="navLink"
          to="/wishlist"
        >
          <i className="fa-regular fa-heart nav-icon"></i>
          {wishlist.length > 0 ? (
            <span className="wishlist-items-count">{wishlist.length}</span>
          ) : (
            ""
          )}
        </NavLink>

        <Tooltip id="Cart-tooltip" />
        <NavLink
          data-tooltip-id="Cart-tooltip"
          data-tooltip-content="Cart"
          data-tooltip-place="bottom"
          className="navLink"
          to="/cart"
        >
          <i className="fa-solid fa-cart-shopping nav-icon"></i>
          {cart?.length > 0 ? (
            <span className="cart-items-count">{cart.length}</span>
          ) : (
            ""
          )}
        </NavLink>

        {token ? (
          ""
        ) : (
          <>
            <Tooltip id="login-tooltip" />
            <NavLink
              data-tooltip-id="login-tooltip"
              data-tooltip-content="Login"
              data-tooltip-place="bottom"
              className="navLink"
              to="/login"
            >
              <span>Login</span>
            </NavLink>
          </>
        )}
        {token ? <ThreeDots /> : ""}
      </div>
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="nav">
      <Logo />
      <Searchbar />
      <Nav />
    </nav>
  );
};

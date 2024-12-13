import { FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const QuickLinks = () => {
  return (
    <div className="flex flex-1 flex-col gap-2 ">
      <p className="font-medium">Quick Links</p>
      <div className="flex flex-1 flex-wrap gap-5 quick-links">
        <div className="flex flex-col gap-3 link-parent">
          <Link to="/" className="flex gap-1 items-center">
            <FaCaretRight /> Home
          </Link>
          <Link to="/shop" className="flex gap-1 items-center">
            <FaCaretRight /> Shop
          </Link>
        </div>
        <div className="flex flex-col gap-3 link-parent">
          <Link to="/wishlist" className="flex gap-1 items-center">
            <FaCaretRight /> Wishlist
          </Link>
          <Link to="/cart" className="flex gap-1 items-center">
            <FaCaretRight /> Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

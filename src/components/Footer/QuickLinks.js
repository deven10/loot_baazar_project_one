import { FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const QuickLinks = () => {
  return (
    <div className="flex flex-1 flex-wrap gap-5">
      <div className="flex flex-col gap-3">
        <Link to="#" className="flex gap-1 items-center">
          <FaCaretRight /> Home
        </Link>
        <Link to="#" className="flex gap-1 items-center">
          <FaCaretRight /> Shop
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <Link to="#" className="flex gap-1 items-center">
          <FaCaretRight /> Wishlist
        </Link>
        <Link to="#" className="flex gap-1 items-center">
          <FaCaretRight /> Cart
        </Link>
      </div>
    </div>
  );
};

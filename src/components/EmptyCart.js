import React from "react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="container order-summary-page custom-block block-border-radius">
      <p className="empty-order-summary">
        Sorry you haven't purchased anything yet, please{" "}
        <Link to="/shop" className="underline">
          shop now!
        </Link>
      </p>
    </div>
  );
};

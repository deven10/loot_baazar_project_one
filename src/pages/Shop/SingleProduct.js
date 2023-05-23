import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import "./SingleProduct.css";

export const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const result = await response.json();
        setProduct(result.product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => getProduct, []);

  return (
    <div className="product default-bg-color">
      {loading ? (
        <TailSpin
          height="50"
          width="50"
          color="#333"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            height: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass="loader"
          visible={true}
        />
      ) : (
        <div className="product-item" key={product._id}>
          <div className="relative-position product-img">
            <img
              className="product-item-image"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="product-details">
            <p className="product-item-name mb-3">{product.name}</p>
            <p className="product-item-price">
              <span className="selling-price">
                <sup>₹</sup>
                {product.price}/-
              </span>
              <span className="mrp-price">
                <span>M.R.P</span>
                <span className="line-through">₹{product.mrp}/- </span>
              </span>
            </p>
            <p className="product-rating mt-3 mb-4">
              Product Rating: {product.productRating}{" "}
              <i className="fa-solid fa-star star-icon"></i>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

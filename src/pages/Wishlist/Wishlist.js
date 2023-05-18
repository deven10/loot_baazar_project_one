import React from "react";
import "./Wishlist.css";

export const Wishlist = () => {
  const data = [
    {
      id: 1,
      name: "Adidas Jacket",
      liked: true,
      image: "https://rb.gy/ra04f",
      price: 2999,
    },
    {
      id: 2,
      name: "Skybags Premium Bag",
      liked: false,
      image: "https://rb.gy/b3mdb",
      price: 1999,
    },
    {
      id: 3,
      name: "Skybags Premium Bag",
      liked: false,
      image: "https://rb.gy/b3mdb",
      price: 1999,
    },
    {
      id: 4,
      name: "Skybags Premium Bag",
      liked: false,
      image: "https://rb.gy/b3mdb",
      price: 1999,
    },
    {
      id: 5,
      name: "Skybags Premium Bag",
      liked: false,
      image: "https://rb.gy/b3mdb",
      price: 1999,
    },
    {
      id: 6,
      name: "Adidas Jacket",
      liked: true,
      image: "https://rb.gy/ra04f",
      price: 2999,
    },
    {
      id: 7,
      name: "Adidas Jacket",
      liked: true,
      image: "https://rb.gy/ra04f",
      price: 2999,
    },
  ];

  return (
    <div className="main-wishlist-page default-bg-color">
      <h2 className="page-heading">My Wishlist</h2>
      <div className="wishlist-items">
        {data.map((item) => {
          const { id, name, image, price, liked } = item;
          return (
            <div className="wishlist-item" key={id}>
              <div className="relative-position">
                <span className="like-icon">
                  {liked ? (
                    <i className="fa-solid fa-heart color-red heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart heart"></i>
                  )}
                </span>
                <img className="wishlist-item-img" src={image} alt={name} />
              </div>
              <p className="wishlist-item-name">{name}</p>
              <p className="wishlist-item-price">₹ {price}/-</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

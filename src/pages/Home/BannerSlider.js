import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// importing images
import img1 from "../../images/home-img-1.png";
import img2 from "../../images/home-img-2.png";
import img4 from "../../images/home-img-4.png";
import img5 from "../../images/home-img-5.png";

export const BannerSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const bannerImagesData = [
    { src: img1, alt: "first" },
    { src: img2, alt: "second" },
    { src: img4, alt: "third" },
    { src: img5, alt: "fourth" },
  ];

  return (
    <section className="slider">
      <Slider {...settings}>
        {bannerImagesData.map((data) => (
          <div key={data.alt}>
            <Link to="/shop">
              <img
                src={data.src}
                className="d-block w-100 slider-img"
                alt={`Slider ${data.alt}`}
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

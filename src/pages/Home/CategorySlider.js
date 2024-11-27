import React from "react";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css/pagination";
import "swiper/css/navigation";

function CategorySlider({ categoriesState, setSelectedCategory }) {
  const breakpoints = {
    575: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  };

  const navigate = useNavigate();

  return (
    <div className="">
      {categoriesState.loading ? (
        <>
          <Swiper breakpoints={breakpoints}>
            {[1, 2, 3, 4].map((item) => (
              <SwiperSlide key={item}>
                <Skeleton height={250} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <Swiper
            // pagination={{
            //   dynamicBullets: true,
            // }}
            // navigation={true}
            modules={[Autoplay]} //Pagination, Navigation
            breakpoints={breakpoints}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {categoriesState.categories.map((category) => (
              <SwiperSlide
                key={category._id}
                className="cursor-pointer block-border-radius category bg-[#fff]"
                onClick={() => {
                  navigate("/shop", { state: { location: "Home" } });
                  setSelectedCategory(() => category.categoryName);
                }}
              >
                <img
                  src={category.image}
                  alt={category.categoryName}
                  loading="lazy"
                />
                <p className="m-0 text-[15px] font-medium tracking-wide text-center mt-3 select-none">
                  {category.categoryName}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default CategorySlider;

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { set } from "lodash";

const ContentCarousel = () => {
  const [activeColor, setActiveColor] = useState(getRandomColor());
  function getRandomColor() {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  {
    /* 
    const [images, setImages] = useState([]);
  useEffect(() => {
    handleGetImages();
  }, []);

    const handleGetImages = async () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }; */
  }
  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Autoplay, Pagination]}
        onSlideChange={() => setActiveColor(getRandomColor())}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md "
      >
        {/*{images?.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={item.image}
              alt={item.author}
              className="w-1/4 h-2/3 mx-auto "
            />
          </SwiperSlide>
        ))}*/}
        {[1, 2, 3, 4, 5].map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div
              className={`flex items-center justify-center text-xl font-bold ${activeColor} w-full h-full text-white`}
            >
              Promotion {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;

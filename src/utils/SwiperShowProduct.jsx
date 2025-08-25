import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperShowProduct = ({ children }) => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={24}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 3000 }}
      modules={[Pagination, Autoplay, Navigation]}
      className="my-6"
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 16 }, // มือถือ
        640: { slidesPerView: 2, spaceBetween: 20 }, // แท็บเล็ตเล็ก
        1024: { slidesPerView: 3, spaceBetween: 24 }, // เดสก์ท็อป
        1440: { slidesPerView: 4, spaceBetween: 32 }, // หน้าจอใหญ่
      }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperShowProduct;

import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/Product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const Recommend = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = () => {
    listProductBy("sold", "desc", 8)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <SwiperShowProduct>
      {products?.map((item, index) => (
        <SwiperSlide key={index}>
          <ProductCard item={item} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default Recommend;

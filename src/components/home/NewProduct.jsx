import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/Product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = () => {
    listProductBy("createdAt", "desc", 4)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <SwiperShowProduct className="flex justify-start items-center flex-wrap">
      {products?.map((item, index) => (
        <SwiperSlide key={index}>
          <ProductCard item={item} key={index} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default NewProduct;

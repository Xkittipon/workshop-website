import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row m-2">
      {/* SearchBar */}
      <div className="w-full lg:w-1/6 p-4 bg-indigo-50 shadow-lg rounded-sm mb-4 lg:mb-0">
        <SearchCard />
      </div>

      {/* ProductList */}
      <div className="w-full lg:flex-1 p-4 overflow-y-auto ">
        <p className="text-2xl font-bold mb-4">Products</p>
        <div className="flex justify-center flex-wrap gap-4">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-1/4 p-4 bg-gray-50 shadow-lg rounded-sm mt-4 lg:mt-0">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;

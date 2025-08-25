import React from "react";
import { ShoppingBag } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "motion/react";

const ProductCard = ({ item }) => {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="border p-4 m-2 rounded shadow-lg bg-white  items-center w-56 ">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            className="rounded-sm shadow flex justify-center items-center w-56 h-48 hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-gray-400 rounded-sm shadow flex justify-center items-center">
            No Image
          </div>
        )}

        <div className="p-2">
          <div className="text-xl font-bold truncate">{item.title}</div>
          <div className="text-md truncate">{item.description}</div>
        </div>
        <div className="flex justify-around items-center">
          <span className="m-2 font-bold mx-4">
            {numberFormat(item.price)} THB
          </span>
          <button
            onClick={() => actionAddToCart(item)}
            className="bg-[#fca311] text-[#ffff] font-bold  px-4 py-2  rounded-xl shadow-xl border border-gray-200 m-2 hover:scale-105"
          >
            <ShoppingBag />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

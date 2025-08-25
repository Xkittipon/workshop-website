import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  console.log(carts);

  return (
    <div>
      <h1 className="text-2xl font-bold my-3">Your Cart</h1>
      {/* Border */}
      <div className=" p-2">
        {/*card*/}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 mt-2 rounded-sm shadow-md">
            {/* row */}
            <div className="flex justify-between">
              {/* Left */}
              <div className="flex justify-center items-center gap-3">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    className="w-24 h-24 rounded-sm"
                  />
                ) : (
                  <div className="bg-[#61677A] rounded-sm w-20 h-20 flex justify-center items-center">
                    No Image
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    {item.description.length > 40
                      ? item.description.substring(0, 40) + "..."
                      : item.description}
                  </p>
                </div>
              </div>
              {/* Right */}
              <div
                onClick={() => actionRemoveProduct(item.id)}
                className="flex items-center m-2"
              >
                <Trash2 className="text-red-600 hover:scale-105 w-16" />
              </div>
            </div>
            {/* qty & price */}
            <div className="flex justify-between items-center my-5">
              <div className="flex justify-center items-center gap-6 px-2 py-1 border rounded-sm">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="border px-2 py-1 rounded-sm shadow-sm hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <p>{item.count}</p>
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="border px-2 py-1 rounded-sm shadow-sm  hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="font-bold text-[#14213d] mx-2">
                {numberFormat(item.price * item.count)}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between px-2 font-bold text-lg mt-4">
          <span>Total</span>
          <span className="text-[#14213d]">
            {numberFormat(getTotalPrice())}
          </span>
        </div>
        <Link to={"/cart"}>
          <button className="mt-4 bg-[#fca311] text-white w-full py-2 rounded-md shadow-md hover:bg-[#FAB53C] ">
            Check out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;

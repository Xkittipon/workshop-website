import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateTime";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);

  const [orders, setOrder] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res);
        setOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold m-3">Order History</h1>
      {/* table */}
      <div className="space-y-4">
        {orders?.map((item, index) => {
          return (
            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-md ">
              {/* card */}
              <div>
                {/* head */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Order Date</p>
                    <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.orderStatus === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : item.orderStatus === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.orderStatus}
                  </div>
                </div>
                {/* body */}
                <div>
                  <table className="border w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="w-2/5">Product</th>
                        <th className="w-1/5">Price</th>
                        <th className="w-1/5">QTY</th>
                        <th className="w-1/5">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {item?.products?.map((product, index) => {
                        console.log(product);
                        return (
                          <tr key={index} className="text-center">
                            <td className="w-2/5">{product.product.title}</td>
                            <td className="w-1/5">
                              {numberFormat(product.product.price)}
                            </td>
                            <td className="w-1/5">{product.count}</td>
                            <td className="w-1/5">
                              {numberFormat(
                                product.count * product.product.price
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* footer */}
                <div>
                  <div className="text-right">
                    <p>Total Price</p>
                    <p>{numberFormat(item.cartTotal)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;

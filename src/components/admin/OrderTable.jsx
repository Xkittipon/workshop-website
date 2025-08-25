import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import moment from "moment";
import { dateFormat } from "../../utils/dateTime";

const OrderTable = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangOrderStatus = (token, orderId, orderStatus) => {
    console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);
        toast.success("Change Status Successful!!");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
        toast.warn("Change Status Fail!!");
      });
  };

  return (
    <div className="p-4 bg-white m-auto shadow-md rounded-sm">
      <div>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:border [&>th]:font-semibold">
              <th>No</th>
              <th>User Name</th>
              <th>Date</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
              <th>Manage Status</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-800">
            {orders?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 [&>td]:px-4 [&>td]:py-3 [&>td]:border"
                >
                  <td>{index + 1}</td>
                  <td className="text-left">
                    <p className="font-medium">{item.orderedBy.email}</p>
                    <p className="text-xs text-gray-500">
                      {item.orderedBy.address}
                    </p>
                  </td>
                  <td>{dateFormat(item.createdAt)}</td>
                  <td className="text-left">
                    {item.products?.map((product, id) => (
                      <p key={id}>
                        {product.product.title} x {product.count}
                      </p>
                    ))}
                  </td>
                  <td className="font-semibold text-green-600">
                    ฿{numberFormat(item.cartTotal)}
                  </td>
                  <td>
                    <span
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
                    </span>
                  </td>
                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

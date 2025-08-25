import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserCart(token);
  }, []);
  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAddress = () => {
    if (!address) {
      return toast.warning("Please fill address");
    }
    saveAddress(token, address)
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToPayment = () => {
    if (!addressSaved) {
      return toast.warning("Please Input Your Address");
    } else {
      navigate("/user/payment");
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between gap-4">
        {/* Left */}
        <div className="w-2/4">
          <div className="p-4 rounded-md border shadow-md">
            <h1 className="font-bold text-2xl">Address</h1>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Input Your Address For Shipping"
              name="address"
              className="w-full border rounded-sm my-3"
              required
            />
            <button
              onClick={handleSaveAddress}
              className="bg-[#fca311] text-white py-2 px-3 rounded-md shadow-sm hover:bg-[#FAB53C] hover:shadow-lg hover:scale-105"
            >
              Save Address
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="w-2/4">
          <div className="p-4 rounded-md border shadow-md space-y-4">
            <h1 className="font-bold text-2xl ">Summary</h1>
            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title} </p>
                    <p className="text-sm">
                      Quantity: {item.count} x{" "}
                      {numberFormat(item.product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-bold">
                      {numberFormat(item.count * item.product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <hr />
            <div>
              <div className="flex justify-between">
                <p>Shipping cost</p>
                <p className="text-red-500">20.00</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p className="text-red-500">0.00</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <p>Total Price</p>
              <p className="text-green-500 tex-lg">{numberFormat(cartTotal)}</p>
            </div>
            <button
              onClick={handleToPayment}
              className="bg-[#fca311] text-white w-full p-2 rounded-md"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

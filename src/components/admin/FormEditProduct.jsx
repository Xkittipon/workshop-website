import React, { useState, useEffect, use } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  createProduct,
  readProduct,
  listProduct,
  updateProduct,
} from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.category);

  const [form, setForm] = useState(initialState);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("Product fetched:", res);
      setForm(res.data);
    } catch (err) {
      console.log("Error fetching product:", err);
    }
  };

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`Product added ${res.data.title} successfully`);
      navigate("/admin/product");
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="p-4 bg-white m-auto shadow-md rounded-sm">
      <form className="flex flex-col space-y-4 my-7" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <input
          type="text"
          className="w-96 border p-1 rounded-sm"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Product Title"
          name="title"
        />
        <input
          type="text"
          className="w-96 border p-1 rounded-sm"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Product Description"
          name="description"
        />
        <input
          type="number"
          className="w-96 border p-1 rounded-sm"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Product Price"
          name="price"
        />
        <input
          type="number"
          className="w-96 border p-1 rounded-sm"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Product Quantity"
          name="quantity"
        />
        <select
          className="w-96 border p-1 rounded-sm"
          name="categoryId"
          onChange={handleOnChange}
          value={form.categoryId}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <Uploadfile form={form} setForm={setForm} />
        <button className="bg-green-300 p-2 w-40 border rounded-sm">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default FormEditProduct;

import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/Product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateTime";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.category);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      console.log(res);
      setForm(initialState);
      getProduct();
      toast.success(`Product added ${res.data.title} successfully`);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("do you want to delete this product?")) {
      try {
        const res = await deleteProduct(token, id);
        console.log(res);
        toast.success("Delete Product Successful!!");
        getProduct();
      } catch (err) {
        console.log(res);
      }
    }
  };

  return (
    <div className="p-4 bg-white m-auto shadow-md rounded-sm">
      <h1 className="font-bold text-2xl">Add Product</h1>
      <form className="flex flex-col space-y-4 my-4" onSubmit={handleSubmit}>
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
          value={numberFormat(form.price)}
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
        <button className="bg-[#fca311] text-white p-2 w-32 border rounded-sm hover:bg-[#FAB53C]">
          Add Product
        </button>

        <hr />
        <table className="table w-full text-sm text-center ">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sold</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 ">
                <th scope="row">{index + 1}</th>
                <td>
                  {" "}
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      className="w-20 h-20 rounded-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-sm">
                      No Image
                    </div>
                  )}
                </td>
                <td>{product.title}</td>
                <td>
                  {product.description.length > 100
                    ? product.description.substring(0, 100) + "..."
                    : product.description}
                </td>
                <td>{numberFormat(product.price)}</td>
                <td>{product.quantity}</td>
                <td>{product.sold}</td>
                <td>{dateFormat(product.updatedAt)}</td>
                <td>
                  <button className="bg-blue-500 text-white p-1 rounded-sm m-1 hover:scale-105">
                    <Link to={"/admin/product/" + product.id}>
                      <SquarePen className="w-5 h-5" />
                    </Link>
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded-sm m-1 hover:scale-105"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;

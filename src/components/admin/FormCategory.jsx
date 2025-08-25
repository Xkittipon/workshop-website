import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  //const [categories, setCategory] = useState([]);
  const categories = useEcomStore((state) => state.category);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSummit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please enter a category name");
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`Added ${res.data.name} to category successfully`);
      getCategory(token); // Clear the input field after successful submission
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.warn(`Deleted ${res.data.name} from category successfully`);
      // Refresh the category list after deletion
      getCategory(token);
    } catch (err) {
      console.log("Error deleting category:", err);
    }
  };

  return (
    <div className="p-4 bg-white m-auto shadow-md rounded-sm">
      <h1 className="text-2xl font-bold">Category Management</h1>
      <form onSubmit={handleSummit} className="flex flex-col space-y-4 my-4">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="w-96 border p-1 rounded-sm"
        />

        <button className="bg-[#fca311] text-white p-2 w-32 border rounded-sm hover:bg-[#FAB53C]">
          Add Category
        </button>
      </form>
      <hr />
      <ul className="list-disc pl-5">
        {categories.map((item, index) => (
          <>
            <li
              key={index}
              className="text-lg flex justify-between items-center py-2 my-2"
            >
              <span className=" text-xl">{item.name}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 border py-1 px-2 rounded-md hover:text-white "
              >
                Delete
              </button>
            </li>
            <hr />
          </>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;

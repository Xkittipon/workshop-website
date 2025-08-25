import React, { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import useEcomStore from "../../store/ecom-store";
import { removeImage, uploadImages } from "../../api/Product";
import { Loader } from "lucide-react";

const Uploadfile = (props) => {
  const token = useEcomStore((state) => state.token);
  const { form, setForm } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    setIsLoading(true);

    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`This ${file.name} not image files.`);
          continue;
        }

        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadImages(token, data)
              .then((res) => {
                console.log("Image uploaded successfully", res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Image uploaded successfully");
                isLoading(false);
              })
              .catch((err) => {
                console.error("Error uploading image:", err);
                isLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    removeImage(token, public_id)
      .then((res) => {
        const filterImages = form.images.filter((item) => {
          console.log("item", item);
          return item.public_id !== public_id;
        });
        console.log("filterImages", filterImages);
        setForm({ ...form, images: filterImages });
        toast.error("Image removed successfully", res.data);
      })
      .catch((err) => {
        toast.error("Error removing image"),
          console.log("Error removing image:", err);
      });
  };

  return (
    <div className="my-3">
      <div className="flex flex-wrap gap-2 mx-4 my-4">
        {isLoading && <Loader className="w-16 h-16 animate-spin" />}

        {form.images.map((item, index) => {
          return (
            <div className="relative" key={index}>
              <img src={item.url} className="w-36 h-36 hover:scale-105" />
              <span
                className="absolute top-0 right-0 bg-red-500 p-1.5 rounded-sm opacity-60 cursor-pointer"
                onClick={() => handleDelete(item.public_id)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
      <div>
        <input type="file" name="images" multiple onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default Uploadfile;

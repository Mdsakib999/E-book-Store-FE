/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";

export const Addbooks = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);

    if (selectedImage) {
      formData.append("cover", selectedImage); // ✅ Changed from "image" to "cover"
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-5">Add New Book</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 max-w-2xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-4 bg-base-200 p-3 rounded-lg min-h-72 mx-5 md:mx-10 shadow-2xl">
          <div className="w-full flex flex-col gap-1 max-w-xl mx-auto">
            {/* Book Title */}
            <label htmlFor="title" className="font-semibold text-gray-700">
              Book Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter book title"
              {...register("title", { required: "Book title is required" })}
              className="border-gray-600 border w-full h-12 bg-white text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            {/* Author */}
            <label htmlFor="author" className="font-semibold text-gray-700">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Enter author name"
              {...register("author", { required: "Author is required" })}
              className="border-gray-600 border w-full h-12 bg-white text-black"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}

            {/* Price */}
            <label htmlFor="price" className="font-semibold text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter book price"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be a positive number" },
              })}
              className="border-gray-600 border w-full h-12 bg-white text-black"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}

            {/* Description */}
            <label
              htmlFor="description"
              className="font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter book description"
              className="border border-gray-600 w-full min-h-[100px] max-h-[200px] resize-none bg-white text-black"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            {/* Image preview */}
            {imagePreview && (
              <div className="relative mt-4">
                <label className="font-semibold text-gray-700">
                  Book Cover
                </label>
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-red-600"
                  onClick={handleRemoveImage}
                >
                  <IoTrashOutline className="text-xl" />
                </button>
              </div>
            )}
            {/* Upload Button */}
            <label
              htmlFor="image"
              className="btn bg-black text-white py-3 lg:w-1/2 flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoCloudUploadOutline /> Upload Cover Image
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
            {errors.cover && (
              <p className="text-red-500 text-sm">{errors.cover.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end lg:mx-10 mt-4">
          <button
            type="submit"
            className="btn bg-orange-500 px-8 py-2 text-white"
          >
            Add Book
          </button>
        </div>
      </form>
    </>
  );
};

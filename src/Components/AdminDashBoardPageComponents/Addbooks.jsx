import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import showToast from "../../Utils/ShowToast";
import useBookStore from "../../Store/BookStore";

export const Addbooks = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { createBook, loading } = useBookStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const description = watch("description", "");

  const onSubmit = async (data) => {
    if (!selectedBook) {
      showToast({
        title: "Error",
        text: "Please select a PDF file.",
        icon: "error",
      });
      return;
    }

    const bookData = {
      bookName: data.title,
      authorName: data.author,
      description: data.description,
      price: data.price,
      category: data.category,
      image: selectedImage,
      pdf: selectedBook,
    };

    try {
      await createBook(bookData);
      showToast({
        title: "Success",
        text: "Book created successfully!",
        icon: "success",
      });
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedBook(null);
    } catch (error) {
      showToast({
        title: "Error",
        text: `Failed to create book. Please try again. ${error.message}`,
        icon: "error",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      showToast({
        title: "Error",
        text: "Please select a valid image file.",
        icon: "error",
      });
    }
  };

  const handleBookChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedBook(file);
      showToast({
        title: "Success",
        text: "Book file selected successfully.",
        icon: "success",
      });
    } else {
      showToast({
        title: "Error",
        text: "Please select a PDF file.",
        icon: "error",
      });
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
        className="my-4 max-w-4xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-4 bg-base-200 p-3 rounded-lg min-h-72 mx-5 md:mx-10 shadow-2xl">
          <div className="w-full flex flex-col gap-1 max-w-xl mx-auto">
            {/* Category */}
            <label htmlFor="category" className="font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              {...register("category", {
                required: "Book category is required",
              })}
              className="border-gray-600 border w-full h-12 bg-white text-black p-3"
            >
              <option value="">Select a category</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="biography">Biography</option>
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
            {/* Book Title */}
            <label htmlFor="title" className="font-semibold text-gray-700">
              Book Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter book title"
              {...register("title", { required: "Book title is required" })}
              className="border-gray-600 border w-full h-12 bg-white text-black p-3"
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
              className="border-gray-600 border w-full h-12 bg-white text-black p-3"
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
              className="border-gray-600 border w-full h-12 bg-white text-black p-3"
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
              className="border border-gray-600 w-full min-h-[100px] max-h-[200px] resize-none bg-white text-black p-3"
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 300,
                  message: "Description cannot exceed 300 characters",
                },
              })}
            />
            <p className="text-sm text-gray-500 text-right">
              {description.length}/300 characters
            </p>

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
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Upload Cover Button */}
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="image"
                  className="btn bg-black text-white py-3 w-full flex items-center justify-center gap-2 cursor-pointer my-3"
                >
                  <IoCloudUploadOutline /> Upload Cover Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {errors.cover && (
                  <p className="text-red-500 text-sm">{errors.cover.message}</p>
                )}
              </div>

              {/* Upload Book Button */}
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="book"
                  className="btn bg-black text-white py-3 px-2 w-full flex items-center justify-center gap-2 cursor-pointer my-3"
                >
                  {selectedBook ? (
                    selectedBook.name
                  ) : (
                    <>
                      <IoCloudUploadOutline />
                      Upload Book
                    </>
                  )}
                </label>

                <input
                  type="file"
                  id="book"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleBookChange}
                />
                {errors.book && (
                  <p className="text-red-500 text-sm">{errors.book.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end lg:mx-10 mt-4">
          <button
            type="submit"
            className="btn bg-orange-500 px-8 py-2 text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </>
  );
};

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import showToast from "../../Utils/ShowToast";
import useBookStore from "../../Store/BookStore";
import useCategoryStore from "../../Store/CategoryStore";

export const Addbooks = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { createBook, loading } = useBookStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      rating: data.rating,
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
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto my-6 px-4"
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          📚 Add New Book
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register("category", {
                required: "Book category is required",
              })}
              className="form-select w-full mt-1 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.categoryName}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Book Title */}
          <div>
            <label htmlFor="title" className="font-medium text-gray-700">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter book title"
              {...register("title", { required: "Book title is required" })}
              className="form-input w-full mt-1 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="font-medium text-gray-700">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              type="text"
              placeholder="Author name"
              {...register("author", { required: "Author is required" })}
              className="form-input w-full mt-1 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="font-medium text-gray-700">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              min={0}
              placeholder="e.g. 19.99"
              {...register("price", {
                required: "Price is required",
              })}
              className="form-input w-full mt-1 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="font-medium text-gray-700">
              Rating (1–5) <span className="text-red-500">*</span>
            </label>
            <input
              id="rating"
              type="number"
              min={1}
              max={5}
              placeholder="e.g. 4.5"
              {...register("rating", {
                required: "Rating is required",
              })}
              className="form-input w-full mt-1 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label htmlFor="description" className="font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Enter a brief description of the book..."
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 300,
                  message: "Max 300 characters allowed",
                },
              })}
              className="form-textarea w-full mt-1 px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="flex justify-between text-sm mt-1">
              <p className="text-red-500">{errors.description?.message}</p>
              <p className="text-gray-500">{description.length}/300</p>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <label className="font-medium text-gray-700 block mb-2">
                Book Cover Preview
              </label>
              <div className="relative bg-white border border-gray-300 rounded-lg p-3 shadow-sm">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-md w-full h-64 object-contain"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
                  onClick={handleRemoveImage}
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
          )}

          {/* PDF Preview Box */}
          {selectedBook && (
            <div className="w-full">
              <label className="font-medium text-gray-700 block mb-2">
                Book File Preview
              </label>
              <div className="relative bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[220px]">
                    {selectedBook.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedBook.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setSelectedBook(null)}
                >
                  <IoTrashOutline className="text-xl" />
                </button>
              </div>
            </div>
          )}

          {/* File Upload Buttons */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cover Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="cursor-pointer bg-gray-900 text-white py-3 w-full flex items-center justify-center rounded-lg hover:bg-gray-800 transition"
              >
                <IoCloudUploadOutline className="mr-2 text-xl" /> Upload Cover
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {errors.cover && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cover.message}
                </p>
              )}
            </div>

            {/* Book File Upload */}
            <div>
              <label
                htmlFor="book"
                className="cursor-pointer bg-gray-900 text-white py-3 w-full flex items-center justify-center rounded-lg hover:bg-gray-800 transition"
              >
                <IoCloudUploadOutline className="mr-2 text-xl" />
                Upload Book PDF
              </label>
              <input
                type="file"
                id="book"
                accept="application/pdf"
                className="hidden"
                onChange={handleBookChange}
              />
              {errors.book && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.book.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 text-white font-semibold rounded-lg shadow-lg"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </div>
    </form>
  );
};

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import showToast from "../../Utils/ShowToast";

const UpdateBookModal = ({ data, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const description = watch("description", "");

  useEffect(() => {
    if (data) {
      setValue("category", data.category);
      setValue("title", data.bookName);
      setValue("author", data.authorName);
      setValue("price", data.price);
      setValue("discountPrice", data.discountPrice);
      setValue("description", data.shortDescription);
      setImagePreview(data.image);
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    const updatedBook = {
      ...formData,
      image: selectedImage || data.image,
    };

    showToast("Success", "Book updated successfully!", "success");
    onClose(); // Close the modal
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleBookChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedBook(file);
      showToast("Success", "Book file selected successfully.", "success");
    } else {
      showToast("Error", "Please select a PDF file.", "error");
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/10">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Update Book</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[85vh] overflow-y-auto pr-2"
        >
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <label className="font-semibold">Book Cover</label>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-contain rounded-lg mt-2"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <IoTrashOutline />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="font-semibold">Category</label>
              <input
                {...register("category", { required: "Category is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* Title */}
            <div>
              <label className="font-semibold">Title</label>
              <input
                {...register("title", { required: "Book title is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>
            {/* Author */}
            <div>
              <label className="font-semibold">Author</label>
              <input
                {...register("author", { required: "Author is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>
            {/* Price */}
            <div>
              <label className="font-semibold">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>
            {/* Discount Price */}
            <div>
              <label className="font-semibold">Discount Price</label>
              <input
                type="number"
                step="0.01"
                {...register("discountPrice")}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>
          </div>
          {/* Description */}
          <label htmlFor="description" className="font-semibold text-gray-700">
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
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-red-500 text-white px-2 py-3 lg:w-1/3 flex items-center justify-center gap-2 cursor-pointer my-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-3 lg:w-1/3 flex items-center justify-center gap-2 cursor-pointer my-3"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;

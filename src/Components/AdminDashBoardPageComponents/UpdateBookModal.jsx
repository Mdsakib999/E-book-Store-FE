/* eslint-disable */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import showToast from "../../Utils/ShowToast";
import useBookStore from "../../Store/BookStore";

const UpdateBookModal = ({ data, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [removePdfFlag, setRemovePdfFlag] = useState(false);

  const { updateBook, loading } = useBookStore();
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
      setValue("description", data.description);
      setImagePreview(data.image);

      const pdf = data.pdf;
      setPdfPreview(pdf);
      setRemovePdfFlag(false);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    const updatedForm = new FormData();
    updatedForm.append("bookName", formData.title);
    updatedForm.append("authorName", formData.author);
    updatedForm.append("price", formData.price);
    updatedForm.append("discountPrice", formData.discountPrice);
    updatedForm.append("description", formData.description);
    updatedForm.append("category", formData.category);

    if (!imagePreview && !selectedImage) {
      updatedForm.append("removeImage", "true");
    }

    if (removePdfFlag && !selectedBook) {
      updatedForm.append("removePdf", "true");
    }

    if (selectedImage) {
      updatedForm.append("cover", selectedImage);
    }

    if (selectedBook) {
      updatedForm.append("pdf", selectedBook);
    }

    try {
      await updateBook(data._id, updatedForm);
      showToast({
        title: "Book updated successfully!",
        icon: "success",
      });
      onClose();
    } catch (error) {
      showToast({
        title: "Failed to update book.",
        icon: "error",
      });
    }
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
      setRemovePdfFlag(false);
      showToast({
        title: "Book file selected successfully.",
        icon: "success",
      });
    } else {
      showToast({
        title: "Please select a PDF file.",
        icon: "error",
      });
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleRemovePdf = () => {
    setSelectedBook(null);
    setPdfPreview(null);
    setRemovePdfFlag(true);
  };

  // Helper function to extract filename from URL
  const getFileNameFromUrl = (url) => {
    if (!url) return "Unknown file";
    return url.split("/").pop() || url;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/10">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 shadow-lg relative">
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
                className="absolute top-8 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <IoTrashOutline />
              </button>
            </div>
          )}

          {/* PDF Preview - Fixed */}
          {pdfPreview && !removePdfFlag && (
            <div className="relative bg-gray-100 p-4 rounded-lg border">
              <label className="font-semibold text-gray-700 block mb-2">
                Current Book PDF
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 truncate max-w-xs">
                    {getFileNameFromUrl(pdfPreview)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemovePdf}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 ml-2"
                  title="Remove PDF"
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
          )}

          {/* Selected Book Preview */}
          {selectedBook && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <label className="font-semibold text-green-700 block mb-2">
                New Book PDF Selected
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-green-600 truncate max-w-xs">
                    {selectedBook.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 ml-2"
                  title="Remove selected PDF"
                >
                  <IoTrashOutline />
                </button>
              </div>
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
                <IoCloudUploadOutline />
                {selectedBook ? "Replace Book" : "Upload Book"}
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

            <div>
              <label className="font-semibold">Title</label>
              <input
                {...register("title", { required: "Book title is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>

            <div>
              <label className="font-semibold">Author</label>
              <input
                {...register("author", { required: "Author is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>

            <div>
              <label className="font-semibold">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Price is required" })}
                className="border-gray-600 border w-full h-12 bg-white text-black p-3"
              />
            </div>

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
              disabled={loading}
              className="bg-blue-500 text-white px-2 py-3 lg:w-1/3 flex items-center justify-center gap-2 cursor-pointer my-3 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;

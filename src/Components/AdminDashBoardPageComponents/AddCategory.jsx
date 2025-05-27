import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTags } from "react-icons/fa";
import useCategoryStore from "../../Store/CategoryStore";
import showToast from "../../Utils/ShowToast";
import { PrimaryButton } from "../Shared/Button/Button";

export const AddCategory = () => {
  const {
    categories,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
  } = useCategoryStore();

  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (editId) {
        await updateCategory(editId, categoryName);
        showToast({
          title: "Updated",
          text: "Category updated",
          icon: "success",
        });
      } else {
        await addCategory(categoryName);
        showToast({ title: "Added", text: "Category added", icon: "success" });
      }
      setCategoryName("");
      setEditId(null);
    } catch (err) {
      showToast({
        title: "Error",
        text: "Failed to save category",
        icon: "error",
      });
    }
  };

  const handleEdit = (id) => {
    const category = categories.find((c) => c._id === id);
    if (category) {
      setCategoryName(category.name);
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      showToast({
        title: "Deleted",
        text: "Category deleted",
        icon: "success",
      });
    } catch (err) {
      showToast({
        title: "Error",
        text: "Failed to delete category",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto ">
      {/* Form Header */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-tight">
        {editId ? "✏️ Edit Category" : "➕ Add New Category"}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 max-w-2xl mx-auto shadow-md rounded-lg overflow-hidden p-5"
      >
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <PrimaryButton type="submit">
          {editId ? "Update Category" : "Add Category"}
        </PrimaryButton>
      </form>

      {/* Category Display */}
      <div className="max-w-4xl mx-auto p-5 lg:mt-20">
        <h3 className="text-xl font-semibold text-gray-700 mb-10 lg:mb-4">
          📂Available Categories
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {categories.map((category) => (
              <div
                key={category._id}
                className="w-full p-2 rounded-xl shadow-md flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <FaTags className="text-blue-500" />
                  <span className="text-lg font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(category._id)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

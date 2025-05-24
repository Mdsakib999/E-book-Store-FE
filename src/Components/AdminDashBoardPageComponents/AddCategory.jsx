import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCategoryStore from "../../Store/CategoryStore";
import showToast from "../../Utils/ShowToast";

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
    <div className="max-w-4xl mx-auto p-4 bg-white border border-gray-300 shadow-md rounded-md mt-12">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {editId ? "Edit Category" : "Add New Category"}
      </h2>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer font-semibold"
        >
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Category list */}
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          categories.map((category) => (
            <li
              key={category._id}
              className="flex items-center justify-between p-2 border border-gray-200 rounded-md shadow-sm"
            >
              <span className="text-gray-800 font-medium">{category.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(category._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

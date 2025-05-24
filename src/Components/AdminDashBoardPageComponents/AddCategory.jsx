import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const AddCategory = () => {
  const [brandName, setBrandName] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Fiction" },
    { id: 2, name: "Science" },
    { id: 3, name: "Biography" },
    { id: 4, name: "History" },
    { id: 5, name: "Mystery" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Fantasy" },
    { id: 8, name: "Self-Help" },
    { id: 9, name: "Children" },
    { id: 10, name: "Horror" },
    { id: 11, name: "Travel" },
    { id: 12, name: "Comics" },
    { id: 13, name: "Health" },
    { id: 14, name: "Business" },
    { id: 15, name: "Technology" },
  ]);

  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    if (editId !== null) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editId ? { ...cat, name: brandName } : cat
        )
      );
      setEditId(null);
    } else {
      const newCategory = {
        id: Date.now(),
        name: brandName,
      };
      setCategories((prev) => [...prev, newCategory]);
    }

    setBrandName("");
  };

  const handleEdit = (id) => {
    const category = categories.find((c) => c.id === id);
    setBrandName(category.name);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white border border-gray-300 shadow-md rounded-md mt-12">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {editId !== null ? "Edit Category" : "Add New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer font-semibold"
        >
          {editId !== null ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Category list */}
      <ul className="grid grid-cols-4 gap-5 mt-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between p-2 border border-gray-200 rounded-md shadow-sm"
          >
            <span className="text-gray-800 font-medium">{category.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(category.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

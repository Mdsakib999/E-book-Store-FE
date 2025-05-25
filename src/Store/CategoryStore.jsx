import { create } from "zustand";
import axiosInstance from "../Utils/axios";

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  // Fetch all categories
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/categories");
      set({ categories: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load categories",
        loading: false,
      });
    }
  },

  // Add a new category
  addCategory: async (name) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/categories", { name });
      set((state) => ({
        categories: [res.data, ...state.categories],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add category",
        loading: false,
      });
    }
  },

  // Update a category
  updateCategory: async (id, name) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/categories/${id}`, { name });
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? res.data : cat
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update category",
        loading: false,
      });
    }
  },

  // Delete a category
  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete category",
        loading: false,
      });
    }
  },
}));

export default useCategoryStore;

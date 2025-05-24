import { create } from "zustand";
import axiosInstance from "../Utils/axios";
const useBookStore = create((set) => ({
	books: [],
	book: null,
	loading: false,
	error: null,

	// Fetch all books
	fetchBooks: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axiosInstance.get(`book/allbooks`);
			set({ books: response.data, loading: false });
		} catch (error) {
			set({
				error: error.response?.data?.message || "Failed to fetch books",
				loading: false,
			});
		}
	},

	// Fetch book by ID

	fetchBookById: async (id) => {
		console.log("Fetching book with ID:", id); //
		set({ loading: true, error: null });
		try {
			const response = await axiosInstance.get(`book/${id}`);
			set({ book: response.data, loading: false });
		} catch (error) {
			set({
				error: error.response?.data?.message || "Failed to fetch book",
				loading: false,
			});
		}
	},

	// Create a new book
	createBook: async (bookData) => {
		set({ loading: true, error: null });
		try {
			const formData = new FormData();
			Object.entries(bookData).forEach(([key, value]) => {
				if (value) formData.append(key, value);
			});

			const response = await axiosInstance.post(`book/add-books`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			set((state) => ({
				books: [...state.books, response.data],
				loading: false,
			}));
		} catch (error) {
			set({
				error: error.response?.data?.message || "Failed to create book",
				loading: false,
			});
		}
	},

	// Update book
	updateBook: async (id, formData) => {
		set({ loading: true, error: null });
		try {
			const response = await axiosInstance.put(`book/${id}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			set((state) => ({
				books: state.books.map((book) =>
					book._id === id ? { ...book, ...response.data.data } : book
				),
				loading: false,
			}));
		} catch (error) {
			set({
				error: error.response?.data?.message || "Failed to update book",
				loading: false,
			});
		}
	},

	// Delete book
	deleteBook: async (id) => {
		set({ loading: true, error: null });
		try {
			await axiosInstance.delete(`book/${id}`);
			set((state) => ({
				books: state.books.filter((book) => book._id !== id),
				loading: false,
			}));
		} catch (error) {
			set({
				error: error.response?.data?.message || "Failed to delete book",
				loading: false,
			});
		}
	},
}));

export default useBookStore;

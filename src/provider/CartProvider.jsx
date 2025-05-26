import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (item) => {
		if (!cartItems.find((cartItem) => cartItem._id === item._id)) {
			setCartItems([...cartItems, item]);
		}
	};

	const isInCart = (itemId) => {
		return cartItems.some((item) => item._id === itemId);
	};

	const removeFromCart = (itemId) => {
		setCartItems(cartItems.filter((item) => item._id !== itemId));
	};

	const clearCart = () => {
		localStorage.removeItem("cart");
		setCartItems([]);
	};

	return (
		<CartContext.Provider
			value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

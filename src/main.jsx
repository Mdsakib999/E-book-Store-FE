import "./index.css";
import { Toaster } from "react-hot-toast";
import { router } from "./Router/routs.jsx";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.jsx";
import CurrencyProvider from "./provider/CurrencyProvider.jsx";
import CartProvider from "./provider/CartProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<CurrencyProvider>
			<CartProvider>
				<RouterProvider router={router} />
				<Toaster />
			</CartProvider>
		</CurrencyProvider>
	</AuthProvider>
);

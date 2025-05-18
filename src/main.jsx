import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/routs.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<main>
		<RouterProvider router={router} />
	</main>
);

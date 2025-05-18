import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App></App>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
		],
	},
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
]);

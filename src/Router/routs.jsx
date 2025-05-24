import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import BookDetails from "../Pages/BookDetails";
import AllBooks from "../Pages/AllBooks";
import PrivateRoute from "./PrivateRoute";
import { UserDashboard } from "../Pages/DashBoard/UserDashBoard/UserDashboard";
import { UpdateProfile } from "../Components/UserDashBoardPageComponents/UpdateProfile";
import { OrderHistory } from "../Components/UserDashBoardPageComponents/OrderHistory";
import { AdminDashBoard } from "../Pages/DashBoard/AdminDashBoard/AdminDashBoard";
import { ManageUsers } from "../Components/AdminDashBoardPageComponents/ManageUsers";
import { Addbooks } from "../Components/AdminDashBoardPageComponents/Addbooks";
import { ManageBooks } from "../Components/AdminDashBoardPageComponents/ManageBooks";
import { ManageOrders } from "../Components/AdminDashBoardPageComponents/ManageOrders";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import { NotFound } from "../Pages/NotFound/NotFound";
import { AddCategory } from "../Components/AdminDashBoardPageComponents/AddCategory";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App></App>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/allbooks",
				element: <AllBooks></AllBooks>,
			},
			{
				path: "/contact",
				element: <Contact></Contact>,
			},
			{
				path: "/about",
				element: <About></About>,
			},
			{
				path: "/book/:id",
				element: <BookDetails></BookDetails>,
			},
			{
				path: "/signin",
				element: <SignIn />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/dashboard",
				element: (
					<PrivateRoute>
						<UserDashboard />
					</PrivateRoute>
				),
				children: [
					{
						path: "",
						element: <UpdateProfile />,
					},
					{
						path: "order",
						element: <OrderHistory />,
					},
				],
			},
			{
				path: "/admin/dashboard",
				element: (
					<PrivateRoute>
						<AdminDashBoard />
					</PrivateRoute>
				),
				children: [
					{
						path: "",
						element: <UpdateProfile />,
					},
					{
						path: "manage-users",
						element: <ManageUsers />,
					},
					{
						path: "add-books",
						element: <Addbooks />,
					},
					{
						path: "manage-category",
						element: <AddCategory />,
					},
					{
						path: "manage-books",
						element: <ManageBooks />,
					},
					{
						path: "manage-orders",
						element: <ManageOrders />,
					},
				],
			},
		],
	},
	{ path: "*", element: <NotFound /> },
]);

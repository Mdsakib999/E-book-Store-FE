import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import BookDetails from "../Pages/BookDetails";
import AllBooks from "../Pages/AllBooks";
import PrivateRoute from "./PrivateRoute";
import { Dashboard } from "../Pages/DashBoard/Dashboard";
import { UpdateProfile } from "../Components/UserDashBoardPageComponents/UpdateProfile";
import { OrderHistory } from "../Components/UserDashBoardPageComponents/OrderHistory";
import { ManageUsers } from "../Components/AdminDashBoardPageComponents/ManageUsers";
import { AddBooks } from "../Components/AdminDashBoardPageComponents/Addbooks";
import { ManageBooks } from "../Components/AdminDashBoardPageComponents/ManageBooks";
import { ManageOrders } from "../Components/AdminDashBoardPageComponents/ManageOrders";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import { NotFound } from "../Pages/NotFound/NotFound";
import { AddCategory } from "../Components/AdminDashBoardPageComponents/AddCategory";
import { AdminRoute } from "./AdminRoute";
import CheckOutPage from "../Pages/CheckOutPage";
import { Statistics } from "../Components/AdminDashBoardPageComponents/statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/checkout",
        element: <CheckOutPage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  // Private Routes

  // User Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
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

  // Admin Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <UpdateProfile />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "add-books",
        element: <AddBooks />,
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
  { path: "*", element: <NotFound /> },
]);

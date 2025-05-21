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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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
        path: "/allbooks/:id",
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
    ],
  },
]);

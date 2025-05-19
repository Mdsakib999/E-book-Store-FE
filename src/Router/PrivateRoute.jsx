import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<svg
					className="animate-spin h-10 w-10 text-blue-500"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4.93 4.93a10 10 0 0114.14 14.14A10 10 0 014.93 4.93z"
					></path>
				</svg>
			</div>
		);
	}

	if (user) {
		return children;
	}
	return <Navigate to="/signin" state={{ from: location }} replace={true} />;
};

export default PrivateRoute;

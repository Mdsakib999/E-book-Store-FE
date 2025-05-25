import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";

export const AdminRoute = ({ children }) => {
	const { user } = useAuth();
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const localUser = localStorage.getItem("user");
		if (user && localUser) {
			try {
				const parsed = JSON.parse(localUser);
				setIsAdmin(parsed.role === "admin");
			} catch {
				setIsAdmin(false);
			}
		} else {
			setIsAdmin(false);
		}
		setLoading(false);
	}, [user]);

	if (loading) return <Loading />;

	if (user && isAdmin) {
		return children;
	}

	return <Navigate to="/error" state={{ from: location }} replace />;
};

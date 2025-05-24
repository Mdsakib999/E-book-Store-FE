import { createContext, useContext, useEffect, useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	sendPasswordResetEmail,
} from "firebase/auth";
import app from "../Pages/Auth/firebase/firebase.config";

const auth = getAuth(app);
const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logout = () => {
		setLoading(true);
		return signOut(auth);
	};

	const forgotPassword = (email) => {
		setLoading(true);
		return sendPasswordResetEmail(auth, email);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		loading,
		user,
		createUser,
		signIn,
		googleSignIn,
		logout,
		forgotPassword,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

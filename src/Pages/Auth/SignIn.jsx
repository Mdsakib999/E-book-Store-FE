import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = () => {};

	const handleGoogleSignIn = () => {};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 font-serif">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
						Readify
					</h1>
					<p className="mt-2 text-sm text-gray-600">Welcome Back ,</p>
					<p className="mt-2 text-sm text-gray-600">
						Sign in to access your account
					</p>
				</div>

				<div className="mt-8 space-y-6">
					<div className="relative">
						<label htmlFor="email" className="sr-only">
							Email address
						</label>
						<div className="flex items-center">
							<span className="absolute left-3 text-gray-500">
								<FiMail className="h-5 w-5" />
							</span>
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Email address"
							/>
						</div>
					</div>

					<div className="relative">
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<div className="flex items-center">
							<span className="absolute left-3 text-gray-500">
								<FiLock className="h-5 w-5" />
							</span>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 text-gray-500 focus:outline-none"
							>
								{showPassword ? (
									<FiEyeOff className="h-5 w-5" />
								) : (
									<FiEye className="h-5 w-5" />
								)}
							</button>
						</div>
					</div>

					<div className="flex items-center justify-end">
						<button
							type="button"
							className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
						>
							Forgot your password?
						</button>
					</div>

					<div>
						<button
							onClick={handleSignIn}
							className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
						>
							Sign In
						</button>
					</div>
				</div>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6">
						<button
							type="button"
							onClick={handleGoogleSignIn}
							className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<svg className="h-5 w-5" fill="#4285F4" viewBox="0 0 24 24">
								<path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
							</svg>
							<span className="ml-2">Sign in with Google</span>
						</button>
					</div>
				</div>

				<div className="text-center mt-4 text-sm font-medium">
					<span>Don't have an account? </span>
					<Link
						to="/signup"
						className=" text-blue-600 hover:text-blue-500 focus:outline-none"
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

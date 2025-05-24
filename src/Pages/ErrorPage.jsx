import { FaExclamationTriangle, FaHome, FaBookOpen } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";

const ErrorPage = () => {
	const handleRetry = () => {
		window.location.reload();
	};

	const handleGoHome = () => {
		window.location.href = "/";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 text-center">
				{/* Error Icon */}
				<div className="flex justify-center">
					<div className="relative">
						<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
							<FaExclamationTriangle className="w-12 h-12 text-red-500" />
						</div>
						<div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
							<span className="text-white text-xs font-bold">!</span>
						</div>
					</div>
				</div>

				{/* Error Message */}
				<div className="space-y-4">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold text-gray-900">
							Oops! Something went wrong
						</h1>
						<p className="text-lg text-gray-600">
							We're having trouble processing your request
						</p>
					</div>

					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<p className="text-sm text-red-700">
							<span className="font-medium">Error:</span> Unable to complete the
							purchase. Please check your connection and try again.
						</p>
					</div>
				</div>

				{/* Book Illustration */}
				<div className="flex justify-center py-4">
					<div className="relative">
						<FaBookOpen className="w-16 h-16 text-blue-300" />
						<div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 rounded-lg transform rotate-3"></div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					<button
						onClick={handleRetry}
						className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
					>
						<HiArrowPath className="w-5 h-5 mr-2" />
						Try Again
					</button>

					<div className="grid grid-cols-1 gap-3">
						<button
							onClick={handleGoHome}
							className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
						>
							<FaHome className="w-4 h-4 mr-2" />
							Back to Home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;

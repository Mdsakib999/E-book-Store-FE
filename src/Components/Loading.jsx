const Loading = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="flex space-x-2">
				<div
					className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"
					style={{ animationDelay: "0s" }}
				></div>
				<div
					className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"
					style={{ animationDelay: "0.2s" }}
				></div>
				<div
					className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"
					style={{ animationDelay: "0.4s" }}
				></div>
			</div>
		</div>
	);
};

export default Loading;

import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-800">
          Oops! Page not found.
        </p>
        <p className="text-md mt-2 text-gray-500">
          The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export const PrimaryButton = ({ children, className = "", ...props }) => {
  const baseClass =
    "cursor-pointer bg-gradient-to-r from-black to-gray-500 px-6 py-2 rounded-md text-white font-bold shadow-md hover:from-gray-500 hover:to-black transition";

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

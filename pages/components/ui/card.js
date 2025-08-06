export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {children}
    </button>
  );
}

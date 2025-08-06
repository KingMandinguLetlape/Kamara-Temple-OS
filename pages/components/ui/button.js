export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-purple-700 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-purple-800 transition ${className}`}
    >
      {children}
    </button>
  );
}

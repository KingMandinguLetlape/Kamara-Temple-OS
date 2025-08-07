
export function Button({ children, ...props }) {
  return (
    <button className="bg-white text-black px-4 py-2 rounded" {...props}>
      {children}
    </button>
  );
}

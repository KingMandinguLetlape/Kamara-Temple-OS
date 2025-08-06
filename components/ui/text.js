export default function Text({ children, className = "" }) {
  return (
    <p className={`text-gray-800 ${className}`}>
      {children}
    </p>
  );
}

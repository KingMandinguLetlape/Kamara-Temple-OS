export function Text({ children, className = "" }) {
  return (
    <p className={`text-base text-gray-200 ${className}`}>
      {children}
    </p>
  );
}

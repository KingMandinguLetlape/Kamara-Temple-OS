export function Text({ children, className = "" }) {
  return (
    <p className={`text-base text-white leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

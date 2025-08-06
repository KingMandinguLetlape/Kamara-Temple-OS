export function Reveal({ children }) {
  return (
    <div className="animate-fade-in transition-opacity duration-700 ease-in-out">
      {children}
    </div>
  );
}

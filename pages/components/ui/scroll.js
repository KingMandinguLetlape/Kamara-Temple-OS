export function Scroll({ children }) {
  return (
    <div className="overflow-y-auto max-h-screen px-4 py-6">
      {children}
    </div>
  );
}

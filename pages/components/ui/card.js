export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

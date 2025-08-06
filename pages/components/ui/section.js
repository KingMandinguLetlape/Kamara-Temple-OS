export function Section({ children, className = "" }) {
  return (
    <section className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

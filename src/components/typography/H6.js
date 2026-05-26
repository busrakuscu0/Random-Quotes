export function H6({ element, children }) {
  switch (element) {
    case "p":
      return (
        <p className="text-md font-semibold text-slate-900 self-end">
          {children}
        </p>
      );
    case "span":
      return (
        <span className="text-md font-semibold text-slate-900 self-end">
          {children}
        </span>
      );
    default:
      return (
        <h6 className="text-md font-semibold text-slate-900 self-end">
          {children}
        </h6>
      );
  }
}

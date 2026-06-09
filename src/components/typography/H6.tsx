import {ReactNode} from "react";

export interface H6Interface {
  element: "p" | "span";
  children: ReactNode;
}

export function H6({ element, children }: H6Interface) {
  switch (element) {
    case "p":
      return (
        <p className="text-md font-semibold text-slate-900 self-end">
          {children}
        </p>
      );
    case "span":
      return <span className="text-md font-semibold self-end">{children}</span>;
    default:
      return (
        <h6 className="text-md font-semibold text-slate-900 self-end">
          {children}
        </h6>
      );
  }
}

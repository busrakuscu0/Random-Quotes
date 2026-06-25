import { ReactNode } from "react";

interface H3Interface {
  element: "p" | "span" | "h1";
  children: ReactNode;
}

export function H3({ element, children }: H3Interface): ReactNode {
  switch (element) {
    case "p":
      return <p className="text-lg md:text-2xl font-semibold">{children}</p>;
    case "span":
      return (
        <span className="text-lg md:text-2xl font-semibold">{children}</span>
      );
    case "h1":
      return <h1 className="text-lg md:text-2xl font-semibold">{children}</h1>;
    default:
      return <h3 className="text-lg md:text-2xl font-semibold">{children}</h3>;
  }
}

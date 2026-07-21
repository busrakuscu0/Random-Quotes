import { H6Interface } from "@/types/quotes";

export function H6({ element, children }: H6Interface) {
  switch (element) {
    case "p":
      return (
        <p className="text-sm md:text-md font-semibold self-end">{children}</p>
      );
    case "span":
      return (
        <span className="text-sm md:text-md font-semibold self-end">
          {children}
        </span>
      );
    default:
      return (
        <h6 className="text-sm md:text-md font-semibold self-end">
          {children}
        </h6>
      );
  }
}

"use client";
import { H3Interface } from "@/types/quotes";
import { ReactNode } from "react";

export function H3({ element, children }: H3Interface): ReactNode {
  switch (element) {
    case "p":
      return (
        <p className="text-lg md:text-3xl lg:text-4xl font-bold max-w-2xl text-chart-5">
          {children}
        </p>
      );
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

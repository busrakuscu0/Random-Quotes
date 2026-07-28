import { ReactNode } from "react";
import z from "zod";

export const categories = [
  "Life",
  "Love",
  "Inspirational",
  "Motivational",
  "Wisdom",
];

export const NewQuoteSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, { message: "Author name should be at least 2 characters long." })
    .max(50, {
      message:
        "Author name should be 50 characters long maximum.Please try to shorter name.",
    }),
  quote: z
    .string()
    .trim()
    .min(5, { message: "Quote should be at least 5 characters long." })
    .max(300, {
      message:
        "Quote should be 300 characters long maximum.Please try to shorter quote.",
    }),
  category: z.enum(categories, {
    message: "Please select a valid category from the dropdown.",
  }),
});

export type NewQuoteInput = z.infer<typeof NewQuoteSchema>;

export interface AddNewQuoteState {
  success: boolean;
  errors?: any;
  message?: string;
  data?: NewQuoteInput;
}

export interface Quote {
  _id: string;
  quote: string;
  author: string;
  category: string;
  likedBy?: string[];
  createdBy: string;
  adminApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteCardProps {
  id: string;
  handleToggleLike: (userSub: string) => void;
  likedBy: string[];
  quote: string;
  author: string;
  handleQuoteIndexUpdate: () => void;
  handleQuoteDelete: (quoteId: string) => void;
}

export interface RootLayoutInterface {
  children: ReactNode;
}

export interface QuoteContextInterface {
  quotes: Quote[];
  quoteIndex: number;
  isLoading: boolean;
  error: string | null;
  handleQuoteIndexUpdate: () => void;
  handleToggleLike: (quoteContent: string) => void;
  handleQuoteEdit: (
    quoteId: string,
    updatedData: { quote?: string; author?: string; category?: string },
  ) => void;
  handleQuoteDelete: (quoteId: string) => void;
  likedQuotes: Quote[];
}

export interface H6Interface {
  element: "p" | "span";
  children: ReactNode;
}

export interface H3Interface {
  element: "p" | "span" | "h1";
  children: ReactNode;
}

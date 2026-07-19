import z from "zod";

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
});

export interface NewQuoteInput {
  author: string;
  quote: string;
}

export interface AddNewQuoteState {
  success: boolean;
  errors?: any;
  message?: string;
  data?: NewQuoteInput;
}

export interface Quote {
  quote: string;
  author: string;
  likedBy?: string[];
}

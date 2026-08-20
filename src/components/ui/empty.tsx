import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Empty({ className = "", ...props }) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-2 md:gap-4 rounded-lg border-dashed p-8 md:p-12 text-center text-balance",
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-xs md:max-w-sm flex-col items-center gap-1 md:gap-2",
        className,
      )}
      {...props}
    />
  );
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function EmptyMedia({ className = "", variant = "default", ...props }) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(
        emptyMediaVariants({
          variant: variant as "default" | "icon",
          className,
        }),
      )}
      {...props}
    />
  );
}

function EmptyTitle({ className = "", ...props }) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-heading text-md md:text-lg font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function EmptyDescription({ className = "", ...props }) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

function EmptyContent({ className = "", ...props }) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex justify-center h-6 md:h-9 px-2 md:px-4 max-w-xs md:max-w-sm min-w-0 bg-primary text-primary-foreground hover:bg-primary/80 rounded-4xl flex-col items-center gap-4 text-sm text-balance",
        className,
      )}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};

"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()
  const toasterTheme = theme === "light" || theme === "dark" ? theme : "system"

  return (
    <Sonner
      theme={toasterTheme}
      className="toaster group"
      icons={{
        success: (
          <CheckCircleIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <WarningIcon className="size-4" />
        ),
        error: (
          <XCircleIcon className="size-4" />
        ),
        loading: (
          <SpinnerIcon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props} />
  );
}

export { Toaster }

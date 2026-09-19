import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "compact" | "touch-buzzer";
  shortcut?: string;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      shortcut,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 disabled:opacity-45 disabled:pointer-events-none active:scale-[0.99]";

    const variantStyles = {
      primary:
        "bg-[#6366F1] text-white border border-[#4F46E5] hover:bg-[#5558E6] active:bg-[#4338CA]",
      secondary:
        "bg-[#131B26] text-[#F8FAFC] border border-[rgba(255,255,255,0.08)] hover:bg-[#1C2636] active:bg-[#253248]",
      outline:
        "bg-transparent text-[#F8FAFC] border border-[rgba(255,255,255,0.12)] hover:bg-[#131B26] active:bg-[#1C2636]",
      danger:
        "bg-[#7F1D1D] text-[#FEE2E2] border border-[#991B1B] hover:bg-[#991B1B]",
      ghost:
        "bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.05)]",
    };

    const sizeStyles = {
      sm: "h-7 px-2.5 text-xs rounded",
      compact: "h-8 px-3 text-[13px] rounded", // 32px standard density
      md: "h-9 px-4 text-sm rounded-md",
      lg: "h-11 px-5 text-base rounded-md",
      "touch-buzzer": "h-14 px-6 text-base font-semibold rounded-lg w-full tracking-wide", // Mobile thumb zone
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
        <span className="truncate">{children}</span>
        {shortcut && (
          <kbd className="ml-2 hidden sm:inline-block font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.1)] text-[#94A3B8] border border-[rgba(255,255,255,0.15)]">
            {shortcut}
          </kbd>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

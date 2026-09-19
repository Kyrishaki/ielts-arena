import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "brand" | "success" | "warning";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant = "neutral",
  icon,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral:
      "bg-[#1C2636] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]",
    brand:
      "bg-[#1E1B4B] text-[#A5B4FC] border border-[#4338CA]",
    success:
      "bg-[#064E3B] text-[#A7F3D0] border border-[#047857]",
    warning:
      "bg-[#451A03] text-[#FDE68A] border border-[#B45309]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium tracking-tight uppercase select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="w-3.5 h-3.5 inline-flex items-center">{icon}</span>}
      {children}
    </span>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  density?: "compact" | "normal";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, active, density = "normal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "surface-card rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] text-[#F8FAFC]",
          active && "border-[#6366F1] bg-[#1C2636]",
          density === "compact" ? "p-3" : "p-4 sm:p-5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)] mb-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold tracking-tight text-[#F8FAFC] flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

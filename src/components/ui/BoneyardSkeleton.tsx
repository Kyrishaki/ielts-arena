import React from "react";
import { cn } from "@/lib/utils";

export interface BoneyardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "row" | "card" | "text" | "avatar";
  count?: number;
}

export function BoneyardSkeleton({
  className,
  variant = "text",
  count = 1,
  ...props
}: BoneyardSkeletonProps) {
  const elements = Array.from({ length: count });

  if (variant === "row") {
    // Exact 32px height row skeleton
    return (
      <div className="flex flex-col w-full divide-y divide-[rgba(255,255,255,0.06)]" {...props}>
        {elements.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-8 max-h-8 flex items-center justify-between px-3 animate-pulse bg-[#131B26]",
              className
            )}
          >
            <div className="h-3 w-1/3 bg-[rgba(255,255,255,0.08)] rounded" />
            <div className="h-3 w-16 bg-[rgba(255,255,255,0.05)] rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-md border border-[rgba(255,255,255,0.08)] bg-[#131B26] p-4 animate-pulse space-y-3",
          className
        )}
        {...props}
      >
        <div className="h-4 w-2/5 bg-[rgba(255,255,255,0.08)] rounded" />
        <div className="h-20 bg-[rgba(255,255,255,0.04)] rounded" />
        <div className="h-7 w-full bg-[rgba(255,255,255,0.06)] rounded" />
      </div>
    );
  }

  return (
    <div
      className={cn("animate-pulse bg-[rgba(255,255,255,0.08)] rounded", className)}
      {...props}
    />
  );
}

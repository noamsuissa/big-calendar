import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "bigcal-flex bigcal-h-9 bigcal-w-full bigcal-rounded-md bigcal-border bigcal-border-input bigcal-bg-transparent bigcal-px-3 bigcal-py-1 bigcal-text-base bigcal-shadow-sm bigcal-transition-colors file:bigcal-border-0 file:bigcal-bg-transparent file:bigcal-text-sm file:bigcal-font-medium file:bigcal-text-foreground placeholder:bigcal-text-muted-foreground focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring disabled:bigcal-cursor-not-allowed disabled:bigcal-opacity-50 md:bigcal-text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };

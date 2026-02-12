import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "bigcal-flex bigcal-min-h-[60px] bigcal-w-full bigcal-rounded-md bigcal-border bigcal-border-input bigcal-bg-transparent bigcal-px-3 bigcal-py-2 bigcal-text-base bigcal-shadow-sm placeholder:bigcal-text-muted-foreground focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring disabled:bigcal-cursor-not-allowed disabled:bigcal-opacity-50 md:bigcal-text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

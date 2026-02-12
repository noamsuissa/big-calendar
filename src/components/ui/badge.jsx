import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "bigcal-inline-flex bigcal-items-center bigcal-rounded-md bigcal-border bigcal-px-2.5 bigcal-py-0.5 bigcal-text-xs bigcal-font-semibold bigcal-transition-colors focus:bigcal-outline-none focus:bigcal-ring-2 focus:bigcal-ring-ring focus:bigcal-ring-offset-2",
  {
    variants: {
      variant: {
        default: "bigcal-border-transparent bigcal-bg-primary bigcal-text-primary-foreground bigcal-shadow hover:bigcal-bg-primary/80",
        secondary: "bigcal-border-transparent bigcal-bg-secondary bigcal-text-secondary-foreground hover:bigcal-bg-secondary/80",
        destructive: "bigcal-border-transparent bigcal-bg-destructive bigcal-text-destructive-foreground bigcal-shadow hover:bigcal-bg-destructive/80",
        outline: "bigcal-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "bigcal-inline-flex bigcal-items-center bigcal-justify-center bigcal-gap-2 bigcal-whitespace-nowrap bigcal-rounded-md bigcal-text-sm bigcal-font-medium bigcal-transition-colors focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring disabled:bigcal-pointer-events-none disabled:bigcal-opacity-50 [&_svg]:bigcal-pointer-events-none [&_svg]:bigcal-size-4 [&_svg]:bigcal-shrink-0",
  {
    variants: {
      variant: {
        default: "bigcal-bg-primary bigcal-text-primary-foreground bigcal-shadow hover:bigcal-bg-primary/90",
        destructive: "bigcal-bg-destructive bigcal-text-destructive-foreground bigcal-shadow-sm hover:bigcal-bg-destructive/90",
        outline: "bigcal-border bigcal-border-input bigcal-bg-background bigcal-shadow-sm hover:bigcal-bg-accent hover:bigcal-text-accent-foreground",
        secondary: "bigcal-bg-secondary bigcal-text-secondary-foreground bigcal-shadow-sm hover:bigcal-bg-secondary/80",
        ghost: "hover:bigcal-bg-accent hover:bigcal-text-accent-foreground",
        link: "bigcal-text-primary bigcal-underline-offset-4 hover:bigcal-underline",
      },
      size: {
        default: "bigcal-h-9 bigcal-px-4 bigcal-py-2",
        sm: "bigcal-h-8 bigcal-rounded-md bigcal-px-3 bigcal-text-xs",
        lg: "bigcal-h-10 bigcal-rounded-md bigcal-px-8",
        icon: "bigcal-size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };

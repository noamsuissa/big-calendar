import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("bigcal-text-sm bigcal-font-medium bigcal-leading-none peer-disabled:bigcal-cursor-not-allowed peer-disabled:bigcal-opacity-70");

const Label = React.forwardRef(
  ({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

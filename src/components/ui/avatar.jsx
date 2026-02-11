import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root ref={ref} className={cn("relative bigcal-flex bigcal-h-10 bigcal-w-10 bigcal-shrink-0 bigcal-overflow-hidden bigcal-rounded-full", className)} {...props} />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(
  ({ className, ...props }, ref) => <AvatarPrimitive.Image ref={ref} className={cn("bigcal-aspect-square bigcal-h-full bigcal-w-full", className)} {...props} />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback ref={ref} className={cn("bigcal-flex bigcal-h-full bigcal-w-full bigcal-items-center bigcal-justify-center bigcal-rounded-full bigcal-bg-muted", className)} {...props} />
  )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

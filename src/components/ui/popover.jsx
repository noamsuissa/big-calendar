import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bigcal-z-50 bigcal-w-72 bigcal-origin-[--radix-popover-content-transform-origin] bigcal-rounded-md bigcal-border bigcal-bg-popover bigcal-p-4 bigcal-text-popover-foreground bigcal-shadow-md bigcal-outline-none data-[state=open]:bigcal-animate-in data-[state=closed]:bigcal-animate-out data-[state=closed]:bigcal-fade-out-0 data-[state=open]:bigcal-fade-in-0 data-[state=closed]:bigcal-zoom-out-95 data-[state=open]:bigcal-zoom-in-95 data-[side=bottom]:bigcal-slide-in-from-top-2 data-[side=left]:bigcal-slide-in-from-right-2 data-[side=right]:bigcal-slide-in-from-left-2 data-[side=top]:bigcal-slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

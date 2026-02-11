import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("bigcal-relative bigcal-overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="bigcal-size-full bigcal-rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "bigcal-flex bigcal-touch-none bigcal-select-none bigcal-transition-colors",
        orientation === "vertical" && "bigcal-h-full bigcal-w-2.5 bigcal-border-l bigcal-border-l-transparent bigcal-p-[1px]",
        orientation === "horizontal" && "bigcal-h-2.5 bigcal-flex-col bigcal-border-t bigcal-border-t-transparent bigcal-p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="bigcal-relative bigcal-flex-1 bigcal-rounded-full bigcal-bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

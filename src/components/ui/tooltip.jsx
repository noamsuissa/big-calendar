import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bigcal-z-50 bigcal-overflow-hidden bigcal-rounded-md bigcal-bg-primary bigcal-px-3 bigcal-py-1.5 bigcal-text-xs bigcal-text-primary-foreground bigcal-animate-in bigcal-fade-in-0 bigcal-zoom-in-95 data-[state=closed]:bigcal-animate-out data-[state=closed]:bigcal-fade-out-0 data-[state=closed]:bigcal-zoom-out-95 data-[side=bottom]:bigcal-slide-in-from-top-2 data-[side=left]:bigcal-slide-in-from-right-2 data-[side=right]:bigcal-slide-in-from-left-2 data-[side=top]:bigcal-slide-in-from-bottom-2 bigcal-origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

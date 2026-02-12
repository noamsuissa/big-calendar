import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        "bigcal-peer bigcal-inline-flex bigcal-h-5 bigcal-w-9 bigcal-shrink-0 bigcal-cursor-pointer bigcal-items-center bigcal-rounded-full bigcal-border-2 bigcal-border-transparent bigcal-shadow-sm bigcal-transition-colors focus-visible:bigcal-outline-none focus-visible:bigcal-ring-2 focus-visible:bigcal-ring-ring focus-visible:bigcal-ring-offset-2 focus-visible:bigcal-ring-offset-background disabled:bigcal-cursor-not-allowed disabled:bigcal-opacity-50 data-[state=checked]:bigcal-bg-primary data-[state=unchecked]:bigcal-bg-input",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "bigcal-pointer-events-none bigcal-block bigcal-h-4 bigcal-w-4 bigcal-rounded-full bigcal-bg-background bigcal-shadow-lg bigcal-ring-0 bigcal-transition-transform data-[state=checked]:bigcal-translate-x-4 data-[state=unchecked]:bigcal-translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  ))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

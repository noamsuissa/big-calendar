import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "bigcal-flex bigcal-h-9 bigcal-w-full bigcal-items-center bigcal-justify-between bigcal-whitespace-nowrap bigcal-rounded-md bigcal-border bigcal-border-input bigcal-bg-transparent bigcal-px-3 bigcal-py-2 bigcal-text-sm bigcal-shadow-sm bigcal-ring-offset-background focus:bigcal-outline-none focus:bigcal-ring-1 focus:bigcal-ring-ring disabled:bigcal-cursor-not-allowed disabled:bigcal-opacity-50 data-[placeholder]:bigcal-text-muted-foreground [&>span]:bigcal-line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="bigcal-size-4 bigcal-opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton ref={ref} className={cn("bigcal-flex bigcal-cursor-default bigcal-items-center bigcal-justify-center bigcal-py-1", className)} {...props}>
      <ChevronUp className="bigcal-size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton ref={ref} className={cn("bigcal-flex bigcal-cursor-default bigcal-items-center bigcal-justify-center bigcal-py-1", className)} {...props}>
      <ChevronDown className="bigcal-size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
);
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "bigcal-relative bigcal-z-50 bigcal-max-h-[--radix-select-content-available-height] bigcal-min-w-[8rem] bigcal-origin-[--radix-select-content-transform-origin] bigcal-overflow-y-auto bigcal-overflow-x-hidden bigcal-rounded-md bigcal-border bigcal-bg-popover bigcal-text-popover-foreground bigcal-shadow-md data-[state=open]:bigcal-animate-in data-[state=closed]:bigcal-animate-out data-[state=closed]:bigcal-fade-out-0 data-[state=open]:bigcal-fade-in-0 data-[state=closed]:bigcal-zoom-out-95 data-[state=open]:bigcal-zoom-in-95 data-[side=bottom]:bigcal-slide-in-from-top-2 data-[side=left]:bigcal-slide-in-from-right-2 data-[side=right]:bigcal-slide-in-from-left-2 data-[side=top]:bigcal-slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:bigcal-translate-y-1 data-[side=left]:bigcal--translate-x-1 data-[side=right]:bigcal-translate-x-1 data-[side=top]:bigcal--translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn("bigcal-p-1", position === "popper" && "bigcal-h-[var(--radix-select-trigger-height)] bigcal-w-full bigcal-min-w-[var(--radix-select-trigger-width)]")}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef(
  ({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn("bigcal-px-2 bigcal-py-1.5 bigcal-text-sm bigcal-font-semibold", className)} {...props} />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "bigcal-relative bigcal-flex bigcal-w-full bigcal-cursor-default bigcal-select-none bigcal-items-center bigcal-rounded-sm bigcal-py-1.5 bigcal-pl-2 bigcal-pr-8 bigcal-text-sm bigcal-outline-none focus:bigcal-bg-accent focus:bigcal-text-accent-foreground data-[disabled]:bigcal-pointer-events-none data-[disabled]:bigcal-opacity-50",
        className
      )}
      {...props}
    >
      <span className="bigcal-absolute bigcal-right-2 bigcal-flex bigcal-size-3.5 bigcal-items-center bigcal-justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="bigcal-size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef(
  ({ className, ...props }, ref) => <SelectPrimitive.Separator ref={ref} className={cn("bigcal--mx-1 bigcal-my-1 bigcal-h-px bigcal-bg-muted", className)} {...props} />
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

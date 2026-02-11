import { forwardRef } from "react";
import { DateInput, DateSegment, TimeField } from "react-aria-components";

import { cn } from "@/lib/utils";

// ================================== //

const TimeInput = forwardRef(
  (
    {
      className,
      dateInputClassName,
      segmentClassName,
      disabled,
      "data-invalid": dataInvalid,
      ...props
    },
    ref
  ) => {
    return (
      <TimeField
        ref={ref}
        className={cn("bigcal-relative", className)}
        isDisabled={disabled}
        isInvalid={dataInvalid}
        {...props}
        aria-label="Time"
        shouldForceLeadingZeros
      >
        <DateInput
          className={cn(
            "bigcal-peer bigcal-inline-flex bigcal-h-9 bigcal-w-full bigcal-items-center bigcal-overflow-hidden bigcal-whitespace-nowrap bigcal-rounded-md bigcal-border bigcal-bg-background bigcal-px-3 bigcal-py-2 bigcal-text-sm bigcal-shadow-black",
            "data-[focus-within]:bigcal-outline-none data-[focus-within]:bigcal-ring-1 data-[focus-within]:bigcal-ring-ring",
            "data-[disabled]:bigcal-cursor-not-allowed data-[disabled]:bigcal-opacity-50",
            dateInputClassName
          )}
        >
          {segment => (
            <DateSegment
              segment={segment}
              className={cn(
                "bigcal-inline bigcal-rounded bigcal-p-0.5 bigcal-caret-transparent bigcal-outline bigcal-outline-0",
                "data-[focused]:bigcal-bg-foreground/10 data-[focused]:bigcal-text-foreground",
                "data-[placeholder]:bigcal-text-muted-foreground",
                "data-[disabled]:bigcal-cursor-not-allowed data-[disabled]:bigcal-opacity-50",
                segmentClassName
              )}
            />
          )}
        </DateInput>
      </TimeField>
    );
  }
);

TimeInput.displayName = "TimeInput";

// ================================== //

export { TimeInput };

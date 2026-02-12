import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

function SingleCalendar({ className, classNames, showOutsideDays = true, selected, ...props }) {
  const [currentMonth, setCurrentMonth] = React.useState(selected instanceof Date ? selected : undefined);

  return (
    <DayPicker
      selected={selected}
      showOutsideDays={showOutsideDays}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      className={cn("bigcal-p-3", className)}
      classNames={{
        months: "bigcal-flex bigcal-flex-col sm:bigcal-flex-row bigcal-space-y-4 sm:bigcal-space-x-4 sm:bigcal-space-y-0",
        month: "bigcal-space-y-4",
        caption: "bigcal-flex bigcal-justify-center bigcal-pt-1 bigcal-relative bigcal-items-center",
        caption_label: "bigcal-text-sm bigcal-font-medium",
        nav: "bigcal-space-x-1 bigcal-flex bigcal-items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "bigcal-h-7 bigcal-w-7 bigcal-bg-transparent bigcal-p-0 bigcal-opacity-50 hover:bigcal-opacity-100"),
        nav_button_previous: "bigcal-absolute bigcal-left-1",
        nav_button_next: "bigcal-absolute bigcal-right-1",
        table: "bigcal-w-full bigcal-border-collapse bigcal-space-y-1",
        head_row: "bigcal-flex",
        head_cell: "bigcal-text-muted-foreground bigcal-rounded-md bigcal-w-8 bigcal-font-normal bigcal-text-[0.8rem]",
        row: "bigcal-flex bigcal-w-full bigcal-mt-2",
        cell: cn(
          "bigcal-relative bigcal-p-0 bigcal-text-center bigcal-text-sm focus-within:bigcal-relative focus-within:bigcal-z-20 [&:has([aria-selected])]:bigcal-bg-accent [&:has([aria-selected].day-outside)]:bigcal-bg-accent/50 [&:has([aria-selected].day-range-end)]:bigcal-rounded-r-md",
          "[&:has([aria-selected])]:bigcal-rounded-md"
        ),
        day: cn(buttonVariants({ variant: "ghost" }), "bigcal-h-8 bigcal-w-8 bigcal-p-0 bigcal-font-normal aria-selected:bigcal-opacity-100"),
        day_range_start: "bigcal-day-range-start",
        day_range_end: "bigcal-day-range-end",
        day_selected: "bigcal-bg-primary bigcal-text-primary-foreground hover:bigcal-bg-primary hover:bigcal-text-primary-foreground focus:bigcal-bg-primary focus:bigcal-text-primary-foreground",
        day_today: "bigcal-bg-accent bigcal-text-accent-foreground",
        day_outside: "bigcal-day-outside bigcal-text-muted-foreground aria-selected:bigcal-bg-accent/50 aria-selected:bigcal-text-muted-foreground",
        day_disabled: "bigcal-text-muted-foreground bigcal-opacity-50",
        day_range_middle: "aria-selected:bigcal-bg-accent aria-selected:bigcal-text-accent-foreground",
        day_hidden: "bigcal-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn("bigcal-h-4 bigcal-w-4", className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn("bigcal-h-4 bigcal-w-4", className)} {...props} />,
      }}
      {...props}
    />
  );
}
SingleCalendar.displayName = "Calendar";

export { SingleCalendar };

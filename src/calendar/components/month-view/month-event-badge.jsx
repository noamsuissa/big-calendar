import { cva } from "class-variance-authority";
import { endOfDay, format, isSameDay, parseISO, startOfDay } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { DraggableEvent } from "@/calendar/components/dnd/draggable-event";
import { EventDetailsDialog } from "@/calendar/components/dialogs/event-details-dialog";

import { cn } from "@/lib/utils";

const eventBadgeVariants = cva(
  "bigcal-mx-1 bigcal-flex bigcal-size-auto bigcal-h-6.5 bigcal-select-none bigcal-items-center bigcal-justify-between bigcal-gap-1.5 bigcal-truncate bigcal-whitespace-nowrap bigcal-rounded-md bigcal-border bigcal-px-2 bigcal-text-xs focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring",
  {
    variants: {
      color: {
        // Colored and mixed variants
        blue: "bigcal-border-blue-200 bigcal-bg-blue-50 bigcal-text-blue-700 dark:bigcal-border-blue-800 dark:bigcal-bg-blue-950 dark:bigcal-text-blue-300 [&_.bigcal-event-dot]:bigcal-fill-blue-600",
        green: "bigcal-border-green-200 bigcal-bg-green-50 bigcal-text-green-700 dark:bigcal-border-green-800 dark:bigcal-bg-green-950 dark:bigcal-text-green-300 [&_.bigcal-event-dot]:bigcal-fill-green-600",
        red: "bigcal-border-red-200 bigcal-bg-red-50 bigcal-text-red-700 dark:bigcal-border-red-800 dark:bigcal-bg-red-950 dark:bigcal-text-red-300 [&_.bigcal-event-dot]:bigcal-fill-red-600",
        yellow: "bigcal-border-yellow-200 bigcal-bg-yellow-50 bigcal-text-yellow-700 dark:bigcal-border-yellow-800 dark:bigcal-bg-yellow-950 dark:bigcal-text-yellow-300 [&_.bigcal-event-dot]:bigcal-fill-yellow-600",
        purple: "bigcal-border-purple-200 bigcal-bg-purple-50 bigcal-text-purple-700 dark:bigcal-border-purple-800 dark:bigcal-bg-purple-950 dark:bigcal-text-purple-300 [&_.bigcal-event-dot]:bigcal-fill-purple-600",
        orange: "bigcal-border-orange-200 bigcal-bg-orange-50 bigcal-text-orange-700 dark:bigcal-border-orange-800 dark:bigcal-bg-orange-950 dark:bigcal-text-orange-300 [&_.bigcal-event-dot]:bigcal-fill-orange-600",
        gray: "bigcal-border-neutral-200 bigcal-bg-neutral-50 bigcal-text-neutral-900 dark:bigcal-border-neutral-700 dark:bigcal-bg-neutral-900 dark:bigcal-text-neutral-300 [&_.bigcal-event-dot]:bigcal-fill-neutral-600",

        // Dot variants
        "blue-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-blue-600",
        "green-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-green-600",
        "red-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-red-600",
        "yellow-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-yellow-600",
        "purple-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-purple-600",
        "orange-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-orange-600",
        "gray-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-neutral-600",
      },
      multiDayPosition: {
        first: "bigcal-relative bigcal-z-10 bigcal-mr-0 bigcal-w-[calc(100%_+_1px)] bigcal-rounded-r-none bigcal-border-r-0 [&>span]:bigcal-mr-2.5",
        middle: "bigcal-relative bigcal-z-10 bigcal-mx-0 bigcal-w-[calc(100%_+_1px)] bigcal-rounded-none bigcal-border-x-0",
        last: "bigcal-ml-0 bigcal-rounded-l-none bigcal-border-l-0",
        none: "",
      },
    },
    defaultVariants: {
      color: "blue-dot",
    },
  }
);

export function MonthEventBadge({ event, cellDate, eventCurrentDay, eventTotalDays, className, position: propPosition }) {
  const { badgeVariant } = useCalendar();

  const itemStart = startOfDay(parseISO(event.startDate));
  const itemEnd = endOfDay(parseISO(event.endDate));

  if (cellDate < itemStart || cellDate > itemEnd) return null;

  let position;

  if (propPosition) {
    position = propPosition;
  } else if (eventCurrentDay && eventTotalDays) {
    position = "none";
  } else if (isSameDay(itemStart, itemEnd)) {
    position = "none";
  } else if (isSameDay(cellDate, itemStart)) {
    position = "first";
  } else if (isSameDay(cellDate, itemEnd)) {
    position = "last";
  } else {
    position = "middle";
  }

  const renderBadgeText = ["first", "none"].includes(position);

  const color = badgeVariant === "dot" ? `${event.color}-dot` : event.color;

  const eventBadgeClasses = cn(eventBadgeVariants({ color, multiDayPosition: position, className }));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.currentTarget instanceof HTMLElement) e.currentTarget.click();
    }
  };

  return (
    <DraggableEvent event={event}>
      <EventDetailsDialog event={event}>
        <div role="button" tabIndex={0} className={eventBadgeClasses} onKeyDown={handleKeyDown}>
          <div className="bigcal-flex bigcal-items-center bigcal-gap-1.5 bigcal-truncate">
            {!["middle", "last"].includes(position) && ["mixed", "dot"].includes(badgeVariant) && (
              <svg width="8" height="8" viewBox="0 0 8 8" className="bigcal-event-dot bigcal-shrink-0">
                <circle cx="4" cy="4" r="4" />
              </svg>
            )}

            {renderBadgeText && (
              <p className="bigcal-flex-1 bigcal-truncate bigcal-font-semibold">
                {eventCurrentDay && (
                  <span className="bigcal-text-xs">
                    Day {eventCurrentDay} of {eventTotalDays} •{" "}
                  </span>
                )}
                {event.title}
              </p>
            )}
          </div>

          {renderBadgeText && <span>{format(new Date(event.startDate), "h:mm a")}</span>}
        </div>
      </EventDetailsDialog>
    </DraggableEvent>
  );
}

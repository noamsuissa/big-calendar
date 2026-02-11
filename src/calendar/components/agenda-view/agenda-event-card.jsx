import { format, parseISO } from "date-fns";
import { cva } from "class-variance-authority";
import { Clock, Text, User } from "lucide-react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { EventDetailsDialog } from "@/calendar/components/dialogs/event-details-dialog";

const agendaEventCardVariants = cva(
  "bigcal-flex bigcal-select-none bigcal-items-center bigcal-justify-between bigcal-gap-3 bigcal-rounded-md bigcal-border bigcal-p-3 bigcal-text-sm focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring",
  {
    variants: {
      color: {
        // Colored variants
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
        "orange-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-orange-600",
        "purple-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-purple-600",
        "yellow-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-yellow-600",
        "gray-dot": "bigcal-bg-neutral-50 dark:bigcal-bg-neutral-900 [&_.bigcal-event-dot]:bigcal-fill-neutral-600",
      },
    },
    defaultVariants: {
      color: "blue-dot",
    },
  }
);

export function AgendaEventCard({ event, eventCurrentDay, eventTotalDays, className }) {
  const { badgeVariant } = useCalendar();

  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  const color = badgeVariant === "dot" ? `${event.color}-dot` : event.color;

  const agendaEventCardClasses = agendaEventCardVariants({ color, className });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.currentTarget instanceof HTMLElement) e.currentTarget.click();
    }
  };

  return (
    <EventDetailsDialog event={event}>
      <div role="button" tabIndex={0} className={agendaEventCardClasses} onKeyDown={handleKeyDown}>
        <div className="bigcal-flex bigcal-flex-col bigcal-gap-2">
          <div className="bigcal-flex bigcal-items-center bigcal-gap-1.5">
            {["mixed", "dot"].includes(badgeVariant) && (
              <svg width="8" height="8" viewBox="0 0 8 8" className="bigcal-event-dot bigcal-shrink-0">
                <circle cx="4" cy="4" r="4" />
              </svg>
            )}

            <p className="bigcal-font-medium">
              {eventCurrentDay && eventTotalDays && (
                <span className="bigcal-mr-1 bigcal-text-xs">
                  Day {eventCurrentDay} of {eventTotalDays} •{" "}
                </span>
              )}
              {event.title}
            </p>
          </div>

          <div className="bigcal-mt-1 bigcal-flex bigcal-items-center bigcal-gap-1">
            <User className="bigcal-size-3 bigcal-shrink-0" />
            <p className="bigcal-text-xs bigcal-text-foreground">{event.user.name}</p>
          </div>

          <div className="bigcal-flex bigcal-items-center bigcal-gap-1">
            <Clock className="bigcal-size-3 bigcal-shrink-0" />
            <p className="bigcal-text-xs bigcal-text-foreground">
              {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
            </p>
          </div>

          <div className="bigcal-flex bigcal-items-center bigcal-gap-1">
            <Text className="bigcal-size-3 bigcal-shrink-0" />
            <p className="bigcal-text-xs bigcal-text-foreground">{event.description}</p>
          </div>
        </div>
      </div>
    </EventDetailsDialog>
  );
}

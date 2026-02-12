import { isToday } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { cn } from "@/lib/utils";

export function YearViewDayCell({ day, date, events }) {
  const { setSelectedDate } = useCalendar();

  const maxIndicators = 3;
  const eventCount = events.length;

  const handleClick = () => {
    setSelectedDate(date);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="bigcal-flex bigcal-h-11 bigcal-flex-1 bigcal-flex-col bigcal-items-center bigcal-justify-start bigcal-gap-0.5 bigcal-rounded-md bigcal-pt-1 hover:bigcal-bg-accent focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring"
    >
      <div
        className={cn(
          "bigcal-flex bigcal-size-6 bigcal-items-center bigcal-justify-center bigcal-rounded-full bigcal-text-xs bigcal-font-medium",
          isToday(date) && "bigcal-bg-primary bigcal-font-semibold bigcal-text-primary-foreground"
        )}
      >
        {day}
      </div>

      {eventCount > 0 && (
        <div className="bigcal-mt-0.5 bigcal-flex bigcal-gap-0.5">
          {eventCount <= maxIndicators ? (
            events.map(event => (
              <div
                key={event.id}
                className={cn(
                  "bigcal-size-1.5 bigcal-rounded-full",
                  event.color === "blue" && "bigcal-bg-blue-600",
                  event.color === "green" && "bigcal-bg-green-600",
                  event.color === "red" && "bigcal-bg-red-600",
                  event.color === "yellow" && "bigcal-bg-yellow-600",
                  event.color === "purple" && "bigcal-bg-purple-600",
                  event.color === "orange" && "bigcal-bg-orange-600",
                  event.color === "gray" && "bigcal-bg-neutral-600"
                )}
              />
            ))
          ) : (
            <>
              <div
                className={cn(
                  "bigcal-size-1.5 bigcal-rounded-full",
                  events[0].color === "blue" && "bigcal-bg-blue-600",
                  events[0].color === "green" && "bigcal-bg-green-600",
                  events[0].color === "red" && "bigcal-bg-red-600",
                  events[0].color === "yellow" && "bigcal-bg-yellow-600",
                  events[0].color === "purple" && "bigcal-bg-purple-600",
                  events[0].color === "orange" && "bigcal-bg-orange-600"
                )}
              />
              <span className="bigcal-text-[7px] bigcal-text-muted-foreground">+{eventCount - 1}</span>
            </>
          )}
        </div>
      )}
    </button>
  );
}

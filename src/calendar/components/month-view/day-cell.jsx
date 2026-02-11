import { useMemo } from "react";
import { isToday, startOfDay } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { EventBullet } from "@/calendar/components/month-view/event-bullet";
import { DroppableDayCell } from "@/calendar/components/dnd/droppable-day-cell";
import { MonthEventBadge } from "@/calendar/components/month-view/month-event-badge";

import { cn } from "@/lib/utils";
import { getMonthCellEvents } from "@/calendar/helpers";

const MAX_VISIBLE_EVENTS = 3;

export function DayCell({ cell, events, eventPositions }) {
  const { setSelectedDate } = useCalendar();

  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(() => getMonthCellEvents(date, events, eventPositions), [date, events, eventPositions]);
  const isSunday = date.getDay() === 0;

  const handleClick = () => {
    setSelectedDate(date);
  };

  return (
    <DroppableDayCell cell={cell}>
      <div className={cn("bigcal-flex bigcal-h-full bigcal-flex-col bigcal-gap-1 bigcal-border-l bigcal-border-t bigcal-py-1.5 lg:bigcal-pb-2 lg:bigcal-pt-1", isSunday && "bigcal-border-l-0")}>
        <button
          onClick={handleClick}
          className={cn(
            "bigcal-flex bigcal-size-6 bigcal-translate-x-1 bigcal-items-center bigcal-justify-center bigcal-rounded-full bigcal-text-xs bigcal-font-semibold hover:bigcal-bg-accent focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring lg:bigcal-px-2",
            !currentMonth && "bigcal-opacity-20",
            isToday(date) && "bigcal-bg-primary bigcal-font-bold bigcal-text-primary-foreground bigcal-hover:bg-primary"
          )}
        >
          {day}
        </button>

        <div className={cn("bigcal-flex bigcal-h-6 bigcal-gap-1 bigcal-px-2 lg:bigcal-h-[94px] lg:bigcal-flex-col lg:bigcal-gap-2 lg:bigcal-px-0", !currentMonth && "bigcal-opacity-50")}>
          {[0, 1, 2].map(position => {
            const event = cellEvents.find(e => e.position === position);
            const eventKey = event ? `event-${event.id}-${position}` : `empty-${position}`;

            return (
              <div key={eventKey} className="lg:bigcal-flex-1">
                {event && (
                  <>
                    <EventBullet className="lg:bigcal-hidden" color={event.color} />
                    <MonthEventBadge className="bigcal-hidden lg:bigcal-flex" event={event} cellDate={startOfDay(date)} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {cellEvents.length > MAX_VISIBLE_EVENTS && (
          <p className={cn("bigcal-h-4.5 bigcal-px-1.5 bigcal-text-xs bigcal-font-semibold bigcal-text-muted-foreground", !currentMonth && "bigcal-opacity-50")}>
            <span className="lg:bigcal-hidden">+{cellEvents.length - MAX_VISIBLE_EVENTS}</span>
            <span className="lg:bigcal-hidden lg:bigcal-inline"> {cellEvents.length - MAX_VISIBLE_EVENTS} more...</span>
          </p>
        )}
      </div>
    </DroppableDayCell>
  );
}

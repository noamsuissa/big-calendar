import { useMemo } from "react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { DayCell } from "@/calendar/components/month-view/day-cell";

import { getCalendarCells, calculateMonthEventPositions } from "@/calendar/helpers";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarMonthView({ singleDayEvents, multiDayEvents }) {
  const { selectedDate } = useCalendar();

  const allEvents = [...multiDayEvents, ...singleDayEvents];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(multiDayEvents, singleDayEvents, selectedDate),
    [multiDayEvents, singleDayEvents, selectedDate]
  );

  return (
    <div>
      <div className="bigcal-grid bigcal-grid-cols-7 bigcal-divide-x">
        {WEEK_DAYS.map(day => (
          <div key={day} className="bigcal-flex bigcal-items-center bigcal-justify-center bigcal-py-2">
            <span className="bigcal-text-xs bigcal-font-medium bigcal-text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>

      <div className="bigcal-grid bigcal-grid-cols-7 bigcal-overflow-hidden">
        {cells.map(cell => (
          <DayCell key={cell.date.toISOString()} cell={cell} events={allEvents} eventPositions={eventPositions} />
        ))}
      </div>
    </div>
  );
}

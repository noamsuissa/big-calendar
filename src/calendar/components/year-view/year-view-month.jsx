import { useMemo } from "react";
import { format, isSameDay, parseISO, getDaysInMonth, startOfMonth } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { YearViewDayCell } from "@/calendar/components/year-view/year-view-day-cell";

export function YearViewMonth({ month, events }) {
  const { setSelectedDate } = useCalendar();

  const monthName = format(month, "MMMM");

  const daysInMonth = useMemo(() => {
    const totalDays = getDaysInMonth(month);
    const firstDay = startOfMonth(month).getDay();

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const blanks = Array(firstDay).fill(null);

    return [...blanks, ...days];
  }, [month]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleClick = () => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1));
  };

  return (
    <div className="bigcal-flex bigcal-flex-col">
      <button
        type="button"
        onClick={handleClick}
        className="bigcal-w-full bigcal-rounded-t-lg bigcal-border bigcal-px-3 bigcal-py-2 bigcal-text-sm bigcal-font-semibold hover:bigcal-bg-accent focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring"
      >
        {monthName}
      </button>

      <div className="bigcal-flex-1 bigcal-space-y-2 bigcal-rounded-b-lg bigcal-border bigcal-border-t-0 bigcal-p-3">
        <div className="bigcal-grid bigcal-grid-cols-7 bigcal-gap-x-0.5 bigcal-text-center">
          {weekDays.map((day, index) => (
            <div key={index} className="bigcal-text-xs bigcal-font-medium bigcal-text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="bigcal-grid bigcal-grid-cols-7 bigcal-gap-x-0.5 bigcal-gap-y-2">
          {daysInMonth.map((day, index) => {
            if (day === null) return <div key={`blank-${index}`} className="bigcal-h-10" />;

            const date = new Date(month.getFullYear(), month.getMonth(), day);
            const dayEvents = events.filter(event => isSameDay(parseISO(event.startDate), date) || isSameDay(parseISO(event.endDate), date));

            return <YearViewDayCell key={`day-${day}`} day={day} date={date} events={dayEvents} />;
          })}
        </div>
      </div>
    </div>
  );
}

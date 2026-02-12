import { useMemo } from "react";
import { addMonths, startOfYear } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { YearViewMonth } from "@/calendar/components/year-view/year-view-month";

export function CalendarYearView({ allEvents }) {
  const { selectedDate } = useCalendar();

  const months = useMemo(() => {
    const yearStart = startOfYear(selectedDate);
    return Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i));
  }, [selectedDate]);

  return (
    <div className="bigcal-p-4">
      <div className="bigcal-grid bigcal-grid-cols-1 bigcal-gap-4 md:bigcal-grid-cols-2 lg:bigcal-grid-cols-3 xl:bigcal-grid-cols-4">
        {months.map(month => (
          <YearViewMonth key={month.toString()} month={month} events={allEvents} />
        ))}
      </div>
    </div>
  );
}

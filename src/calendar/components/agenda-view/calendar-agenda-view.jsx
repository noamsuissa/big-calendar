import { useMemo } from "react";
import { CalendarX2 } from "lucide-react";
import { parseISO, format, endOfDay, startOfDay, isSameMonth } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AgendaDayGroup } from "@/calendar/components/agenda-view/agenda-day-group";

export function CalendarAgendaView({ singleDayEvents, multiDayEvents }) {
  const { selectedDate } = useCalendar();

  const eventsByDay = useMemo(() => {
    const allDates = new Map();

    singleDayEvents.forEach(event => {
      const eventDate = parseISO(event.startDate);
      if (!isSameMonth(eventDate, selectedDate)) return;

      const dateKey = format(eventDate, "yyyy-MM-dd");

      if (!allDates.has(dateKey)) {
        allDates.set(dateKey, { date: startOfDay(eventDate), events: [], multiDayEvents: [] });
      }

      allDates.get(dateKey)?.events.push(event);
    });

    multiDayEvents.forEach(event => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);

      let currentDate = startOfDay(eventStart);
      const lastDate = endOfDay(eventEnd);

      while (currentDate <= lastDate) {
        if (isSameMonth(currentDate, selectedDate)) {
          const dateKey = format(currentDate, "yyyy-MM-dd");

          if (!allDates.has(dateKey)) {
            allDates.set(dateKey, { date: new Date(currentDate), events: [], multiDayEvents: [] });
          }

          allDates.get(dateKey)?.multiDayEvents.push(event);
        }
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    });

    return Array.from(allDates.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [singleDayEvents, multiDayEvents, selectedDate]);

  const hasAnyEvents = singleDayEvents.length > 0 || multiDayEvents.length > 0;

  return (
    <div className="bigcal-h-[800px]">
      <ScrollArea className="bigcal-h-full" type="always">
        <div className="bigcal-space-y-6 bigcal-p-4">
          {eventsByDay.map(dayGroup => (
            <AgendaDayGroup key={format(dayGroup.date, "yyyy-MM-dd")} date={dayGroup.date} events={dayGroup.events} multiDayEvents={dayGroup.multiDayEvents} />
          ))}

          {!hasAnyEvents && (
            <div className="bigcal-flex bigcal-flex-col bigcal-items-center bigcal-justify-center bigcal-gap-2 bigcal-py-20 bigcal-text-muted-foreground">
              <CalendarX2 className="bigcal-size-10" />
              <p className="bigcal-text-sm md:bigcal-text-base">No events scheduled for the selected month</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

import { parseISO, isWithinInterval, differenceInDays, startOfDay, endOfDay } from "date-fns";

import { MonthEventBadge } from "@/calendar/components/month-view/month-event-badge";

export function DayViewMultiDayEventsRow({ selectedDate, multiDayEvents }) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const multiDayEventsInDay = multiDayEvents
    .filter(event => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);

      const isOverlapping =
        isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
        isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
        (eventStart <= dayStart && eventEnd >= dayEnd);

      return isOverlapping;
    })
    .sort((a, b) => {
      const durationA = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
      const durationB = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
      return durationB - durationA;
    });

  if (multiDayEventsInDay.length === 0) return null;

  return (
    <div className="bigcal-flex bigcal-border-b">
      <div className="bigcal-w-18"></div>
      <div className="bigcal-flex bigcal-flex-1 bigcal-flex-col bigcal-gap-1 bigcal-border-l bigcal-py-1">
        {multiDayEventsInDay.map(event => {
          const eventStart = startOfDay(parseISO(event.startDate));
          const eventEnd = startOfDay(parseISO(event.endDate));
          const currentDate = startOfDay(selectedDate);

          const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
          const eventCurrentDay = differenceInDays(currentDate, eventStart) + 1;

          return <MonthEventBadge key={event.id} event={event} cellDate={selectedDate} eventCurrentDay={eventCurrentDay} eventTotalDays={eventTotalDays} />;
        })}
      </div>
    </div>
  );
}

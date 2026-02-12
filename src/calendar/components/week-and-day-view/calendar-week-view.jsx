import { startOfWeek, addDays, format, parseISO, isSameDay, areIntervalsOverlapping } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";

import { AddEventDialog } from "@/calendar/components/dialogs/add-event-dialog";
import { EventBlock } from "@/calendar/components/week-and-day-view/event-block";
import { DroppableTimeBlock } from "@/calendar/components/dnd/droppable-time-block";
import { CalendarTimeline } from "@/calendar/components/week-and-day-view/calendar-time-line";
import { WeekViewMultiDayEventsRow } from "@/calendar/components/week-and-day-view/week-view-multi-day-events-row";

import { cn } from "@/lib/utils";
import { groupEvents, getEventBlockStyle, isWorkingHour, getVisibleHours } from "@/calendar/helpers";

export function CalendarWeekView({ singleDayEvents, multiDayEvents }) {
  const { selectedDate, workingHours, visibleHours } = useCalendar();

  const { hours, earliestEventHour, latestEventHour } = getVisibleHours(visibleHours, singleDayEvents);

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <>
      <div className="bigcal-flex bigcal-flex-col bigcal-items-center bigcal-justify-center bigcal-border-b bigcal-py-4 bigcal-text-sm bigcal-text-muted-foreground sm:bigcal-hidden">
        <p>Weekly view is not available on smaller devices.</p>
        <p>Please switch to daily or monthly view.</p>
      </div>

      <div className="bigcal-hidden bigcal-flex-col sm:bigcal-flex">
        <div>
          <WeekViewMultiDayEventsRow selectedDate={selectedDate} multiDayEvents={multiDayEvents} />

          {/* Week header */}
          <div className="bigcal-relative bigcal-z-20 bigcal-flex bigcal-border-b">
            <div className="bigcal-w-18"></div>
            <div className="bigcal-grid bigcal-flex-1 bigcal-grid-cols-7 bigcal-divide-x bigcal-border-l">
              {weekDays.map((day, index) => (
                <span key={index} className="bigcal-py-2 bigcal-text-center bigcal-text-xs bigcal-font-medium bigcal-text-muted-foreground">
                  {format(day, "EE")} <span className="bigcal-ml-1 bigcal-font-semibold bigcal-text-foreground">{format(day, "d")}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="bigcal-h-[736px]" type="always">
          <div className="bigcal-flex bigcal-overflow-hidden">
            {/* Hours column */}
            <div className="bigcal-relative bigcal-w-18">
              {hours.map((hour, index) => (
                <div key={hour} className="bigcal-relative" style={{ height: "96px" }}>
                  <div className="bigcal-absolute bigcal--top-3 bigcal-right-2 bigcal-flex bigcal-h-6 bigcal-items-center">
                    {index !== 0 && <span className="bigcal-text-xs bigcal-text-muted-foreground">{format(new Date().setHours(hour, 0, 0, 0), "hh a")}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Week grid */}
            <div className="bigcal-relative bigcal-flex-1 bigcal-border-l">
              <div className="bigcal-grid bigcal-grid-cols-7 bigcal-divide-x">
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = singleDayEvents.filter(event => isSameDay(parseISO(event.startDate), day) || isSameDay(parseISO(event.endDate), day));
                  const groupedEvents = groupEvents(dayEvents);

                  return (
                    <div key={dayIndex} className="bigcal-relative">
                      {hours.map((hour, index) => {
                        const isDisabled = !isWorkingHour(day, hour, workingHours);

                        return (
                          <div key={hour} className={cn("bigcal-relative bigcal-bg-background", isDisabled && "bigcal-bg-calendar-disabled-hour")} style={{ height: "96px" }}>
                            {index !== 0 && <div className="bigcal-pointer-events-none bigcal-absolute bigcal-inset-x-0 bigcal-top-0 bigcal-border-b"></div>}

                            <DroppableTimeBlock date={day} hour={hour} minute={0}>
                              <AddEventDialog startDate={day} startTime={{ hour, minute: 0 }}>
                                <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-0 bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                              </AddEventDialog>
                            </DroppableTimeBlock>

                            <DroppableTimeBlock date={day} hour={hour} minute={15}>
                              <AddEventDialog startDate={day} startTime={{ hour, minute: 15 }}>
                                <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-[24px] bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                              </AddEventDialog>
                            </DroppableTimeBlock>

                            <div className="bigcal-pointer-events-none bigcal-absolute bigcal-inset-x-0 bigcal-top-1/2 bigcal-border-b bigcal-border-dashed"></div>

                            <DroppableTimeBlock date={day} hour={hour} minute={30}>
                              <AddEventDialog startDate={day} startTime={{ hour, minute: 30 }}>
                                <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-[48px] bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                              </AddEventDialog>
                            </DroppableTimeBlock>

                            <DroppableTimeBlock date={day} hour={hour} minute={45}>
                              <AddEventDialog startDate={day} startTime={{ hour, minute: 45 }}>
                                <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-[72px] bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                              </AddEventDialog>
                            </DroppableTimeBlock>
                          </div>
                        );
                      })}

                      {groupedEvents.map((group, groupIndex) =>
                        group.map(event => {
                          let style = getEventBlockStyle(event, day, groupIndex, groupedEvents.length, { from: earliestEventHour, to: latestEventHour });
                          const hasOverlap = groupedEvents.some(
                            (otherGroup, otherIndex) =>
                              otherIndex !== groupIndex &&
                              otherGroup.some(otherEvent =>
                                areIntervalsOverlapping(
                                  { start: parseISO(event.startDate), end: parseISO(event.endDate) },
                                  { start: parseISO(otherEvent.startDate), end: parseISO(otherEvent.endDate) }
                                )
                              )
                          );

                          if (!hasOverlap) style = { ...style, width: "100%", left: "0%" };

                          return (
                            <div key={event.id} className="bigcal-absolute bigcal-p-1" style={style}>
                              <EventBlock event={event} />
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>

              <CalendarTimeline firstVisibleHour={earliestEventHour} lastVisibleHour={latestEventHour} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

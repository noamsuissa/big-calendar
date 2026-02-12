import { Calendar, Clock, User } from "lucide-react";
import { parseISO, areIntervalsOverlapping, format } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SingleCalendar } from "@/components/ui/single-calendar";

import { AddEventDialog } from "@/calendar/components/dialogs/add-event-dialog";
import { EventBlock } from "@/calendar/components/week-and-day-view/event-block";
import { DroppableTimeBlock } from "@/calendar/components/dnd/droppable-time-block";
import { CalendarTimeline } from "@/calendar/components/week-and-day-view/calendar-time-line";
import { DayViewMultiDayEventsRow } from "@/calendar/components/week-and-day-view/day-view-multi-day-events-row";

import { cn } from "@/lib/utils";
import { groupEvents, getEventBlockStyle, isWorkingHour, getCurrentEvents, getVisibleHours } from "@/calendar/helpers";

export function CalendarDayView({ singleDayEvents, multiDayEvents }) {
  const { selectedDate, setSelectedDate, users, visibleHours, workingHours } = useCalendar();

  const { hours, earliestEventHour, latestEventHour } = getVisibleHours(visibleHours, singleDayEvents);

  const currentEvents = getCurrentEvents(singleDayEvents);

  const dayEvents = singleDayEvents.filter(event => {
    const eventDate = parseISO(event.startDate);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const groupedEvents = groupEvents(dayEvents);

  return (
    <div className="bigcal-flex">
      <div className="bigcal-flex bigcal-flex-1 bigcal-flex-col">
        <div>
          <DayViewMultiDayEventsRow selectedDate={selectedDate} multiDayEvents={multiDayEvents} />

          {/* Day header */}
          <div className="bigcal-relative bigcal-z-20 bigcal-flex bigcal-border-b">
            <div className="bigcal-w-18"></div>
            <span className="bigcal-flex-1 bigcal-border-l bigcal-py-2 bigcal-text-center bigcal-text-xs bigcal-font-medium bigcal-text-muted-foreground">
              {format(selectedDate, "EE")} <span className="bigcal-font-semibold bigcal-text-foreground">{format(selectedDate, "d")}</span>
            </span>
          </div>
        </div>

        <ScrollArea className="bigcal-h-[800px]" type="always">
          <div className="bigcal-flex">
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

            {/* Day grid */}
            <div className="bigcal-relative bigcal-flex-1 bigcal-border-l">
              <div className="bigcal-relative">
                {hours.map((hour, index) => {
                  const isDisabled = !isWorkingHour(selectedDate, hour, workingHours);

                  return (
                    <div 
                      key={hour} 
                      className={cn("bigcal-relative", isDisabled && "bigcal-bg-calendar-disabled-hour")} 
                      style={{ height: "96px" }}
                    >
                      {index !== 0 && <div className="bigcal-pointer-events-none bigcal-absolute bigcal-inset-x-0 bigcal-top-0 bigcal-border-b"></div>}

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={0}>
                        <AddEventDialog startDate={selectedDate} startTime={{ hour, minute: 0 }}>
                          <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-0 bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                        </AddEventDialog>
                      </DroppableTimeBlock>

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={15}>
                        <AddEventDialog startDate={selectedDate} startTime={{ hour, minute: 15 }}>
                          <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-[24px] bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                        </AddEventDialog>
                      </DroppableTimeBlock>

                      <div className="bigcal-pointer-events-none bigcal-absolute bigcal-inset-x-0 bigcal-top-1/2 bigcal-border-b bigcal-border-dashed"></div>

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={30}>
                        <AddEventDialog startDate={selectedDate} startTime={{ hour, minute: 30 }}>
                          <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-[48px] bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                        </AddEventDialog>
                      </DroppableTimeBlock>

                      <DroppableTimeBlock date={selectedDate} hour={hour} minute={45}>
                        <AddEventDialog startDate={selectedDate} startTime={{ hour, minute: 45 }}>
                          <div className="bigcal-absolute bigcal-inset-x-0 bigcal-top-[72px] bigcal-h-[24px] bigcal-cursor-pointer bigcal-transition-colors hover:bigcal-bg-accent" />
                        </AddEventDialog>
                      </DroppableTimeBlock>
                    </div>
                  );
                })}

                {groupedEvents.map((group, groupIndex) =>
                  group.map(event => {
                    let style = getEventBlockStyle(event, selectedDate, groupIndex, groupedEvents.length, { from: earliestEventHour, to: latestEventHour });
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

              <CalendarTimeline firstVisibleHour={earliestEventHour} lastVisibleHour={latestEventHour} />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="bigcal-hidden bigcal-w-64 bigcal-divide-y bigcal-border-l md:bigcal-block">
        <SingleCalendar className="bigcal-mx-auto bigcal-w-fit" mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />

        <div className="bigcal-flex-1 bigcal-space-y-3">
          {currentEvents.length > 0 ? (
            <div className="bigcal-flex bigcal-items-start bigcal-gap-2 bigcal-px-4 bigcal-pt-4">
              <span className="bigcal-relative bigcal-mt-[5px] bigcal-flex bigcal-size-2.5">
                <span className="bigcal-absolute bigcal-inline-flex bigcal-size-full bigcal-animate-ping bigcal-rounded-full bigcal-bg-green-400 bigcal-opacity-75"></span>
                <span className="bigcal-relative bigcal-inline-flex bigcal-size-2.5 bigcal-rounded-full bigcal-bg-green-600"></span>
              </span>

              <p className="bigcal-text-sm bigcal-font-semibold bigcal-text-foreground">Happening now</p>
            </div>
          ) : (
            <p className="bigcal-p-4 bigcal-text-center bigcal-text-sm bigcal-italic bigcal-text-muted-foreground">No appointments or consultations at the moment</p>
          )}

          {currentEvents.length > 0 && (
            <ScrollArea className="bigcal-h-[422px] bigcal-px-4" type="always">
              <div className="bigcal-space-y-6 bigcal-pb-4">
                {currentEvents.map(event => {
                  const user = users.find(user => user.id === event.user.id);

                  return (
                    <div key={event.id} className="bigcal-space-y-1.5">
                      <p className="bigcal-line-clamp-2 bigcal-text-sm bigcal-font-semibold">{event.title}</p>

                      {user && (
                        <div className="bigcal-flex bigcal-items-center bigcal-gap-1.5 bigcal-text-muted-foreground">
                          <User className="bigcal-size-3.5" />
                          <span className="bigcal-text-sm">{user.name}</span>
                        </div>
                      )}

                      <div className="bigcal-flex bigcal-items-center bigcal-gap-1.5 bigcal-text-muted-foreground">
                        <Calendar className="bigcal-size-3.5" />
                        <span className="bigcal-text-sm">{format(new Date(), "MMM d, yyyy")}</span>
                      </div>

                      <div className="bigcal-flex bigcal-items-center bigcal-gap-1.5 bigcal-text-muted-foreground">
                        <Clock className="bigcal-size-3.5" />
                        <span className="bigcal-text-sm">
                          {format(parseISO(event.startDate), "h:mm a")} - {format(parseISO(event.endDate), "h:mm a")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

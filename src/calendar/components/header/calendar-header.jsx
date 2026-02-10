import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UserSelect } from "@/calendar/components/header/user-select";
import { TodayButton } from "@/calendar/components/header/today-button";
import { DateNavigator } from "@/calendar/components/header/date-navigator";
import { AddEventDialog } from "@/calendar/components/dialogs/add-event-dialog";

/**
 * CalendarHeader - Calendar header component with navigation and controls
 * 
 * @param {Object} props
 * @param {string} props.view - Current view
 * @param {Array} props.events - Filtered events
 * @param {Function} props.onViewChange - Callback when view changes
 * @param {boolean} [props.showTodayButton=true] - Show today button
 * @param {boolean} [props.showDateNavigator=true] - Show date navigator
 * @param {boolean} [props.showViewSwitcher=true] - Show view switcher buttons
 * @param {boolean} [props.showUserSelect=true] - Show user filter select
 * @param {boolean} [props.showAddEventButton=true] - Show add event button
 * @param {Array} [props.availableViews] - Available views to show (default: all)
 */
export function CalendarHeader({ 
  view, 
  events, 
  onViewChange,
  showTodayButton = true,
  showDateNavigator = true,
  showViewSwitcher = true,
  showUserSelect = true,
  showAddEventButton = true,
  availableViews = ["day", "week", "month", "year", "agenda"],
}) {
  const handleViewChange = (newView) => {
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      {(showTodayButton || showDateNavigator) && (
        <div className="flex items-center gap-3">
          {showTodayButton && <TodayButton />}
          {showDateNavigator && <DateNavigator view={view} events={events} />}
        </div>
      )}

      {(showViewSwitcher || showUserSelect || showAddEventButton) && (
        <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
          {(showViewSwitcher || showUserSelect) && (
            <div className="flex w-full items-center gap-1.5">
              {showViewSwitcher && (
                <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
                  {availableViews.includes("day") && (
                    <Button 
                      aria-label="View by day" 
                      size="icon" 
                      variant={view === "day" ? "default" : "outline"} 
                      className="rounded-r-none [&_svg]:size-5"
                      onClick={() => handleViewChange("day")}
                    >
                      <List strokeWidth={1.8} />
                    </Button>
                  )}

                  {availableViews.includes("week") && (
                    <Button
                      aria-label="View by week"
                      size="icon"
                      variant={view === "week" ? "default" : "outline"}
                      className="-ml-px rounded-none [&_svg]:size-5"
                      onClick={() => handleViewChange("week")}
                    >
                      <Columns strokeWidth={1.8} />
                    </Button>
                  )}

                  {availableViews.includes("month") && (
                    <Button
                      aria-label="View by month"
                      size="icon"
                      variant={view === "month" ? "default" : "outline"}
                      className="-ml-px rounded-none [&_svg]:size-5"
                      onClick={() => handleViewChange("month")}
                    >
                      <Grid2x2 strokeWidth={1.8} />
                    </Button>
                  )}

                  {availableViews.includes("year") && (
                    <Button
                      aria-label="View by year"
                      size="icon"
                      variant={view === "year" ? "default" : "outline"}
                      className="-ml-px rounded-none [&_svg]:size-5"
                      onClick={() => handleViewChange("year")}
                    >
                      <Grid3x3 strokeWidth={1.8} />
                    </Button>
                  )}

                  {availableViews.includes("agenda") && (
                    <Button
                      aria-label="View by agenda"
                      size="icon"
                      variant={view === "agenda" ? "default" : "outline"}
                      className="-ml-px rounded-l-none [&_svg]:size-5"
                      onClick={() => handleViewChange("agenda")}
                    >
                      <CalendarRange strokeWidth={1.8} />
                    </Button>
                  )}
                </div>
              )}

              {showUserSelect && <UserSelect />}
            </div>
          )}

          {showAddEventButton && (
            <AddEventDialog>
              <Button className="w-full sm:w-auto">
                <Plus />
                Add Event
              </Button>
            </AddEventDialog>
          )}
        </div>
      )}
    </div>
  );
}

import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCalendar } from "@/calendar/contexts/calendar-context";

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
 * @param {string} [props.className] - Custom className for the header container
 * @param {string} [props.leftSectionClassName] - Custom className for left section (today button + navigator)
 * @param {string} [props.rightSectionClassName] - Custom className for right section (controls)
 * @param {string} [props.viewSwitcherClassName] - Custom className for view switcher buttons container
 * @param {string} [props.addButtonClassName] - Custom className for add event button
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
  className,
  leftSectionClassName,
  rightSectionClassName,
  viewSwitcherClassName,
  addButtonClassName,
}) {
  const { singleUser } = useCalendar();
  
  const handleViewChange = (newView) => {
    if (onViewChange) {
      onViewChange(newView);
    }
  };
  
  // Hide user select in single-user mode
  const shouldShowUserSelect = showUserSelect && !singleUser;

  return (
    <div className={cn("bigcal-flex bigcal-flex-col bigcal-gap-4 bigcal-border-b bigcal-p-4 lg:bigcal-flex-row lg:bigcal-items-center lg:bigcal-justify-between", className)}>
      {(showTodayButton || showDateNavigator) && (
        <div className={cn("bigcal-flex bigcal-items-center bigcal-gap-3", leftSectionClassName)}>
          {showTodayButton && <TodayButton />}
          {showDateNavigator && <DateNavigator view={view} events={events} />}
        </div>
      )}

      {(showViewSwitcher || showUserSelect || showAddEventButton) && (
        <div className={cn("bigcal-flex bigcal-flex-col bigcal-items-center bigcal-gap-1.5 sm:bigcal-flex-row sm:bigcal-justify-between", rightSectionClassName)}>
          {(showViewSwitcher || showUserSelect) && (
            <div className="bigcal-flex bigcal-w-full bigcal-items-center bigcal-gap-1.5">
              {showViewSwitcher && (
                <div className={cn("bigcal-inline-flex bigcal-first:rounded-r-none bigcal-last:rounded-l-none bigcal-[&:not(:first-child):not(:last-child)]:bigcal-rounded-none", viewSwitcherClassName)}>
                  {availableViews.includes("day") && (
                    <Button 
                      aria-label="View by day" 
                      size="icon" 
                      variant={view === "day" ? "default" : "outline"} 
                      className="bigcal-rounded-r-none bigcal-[&_svg]:bigcal-size-5"
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
                      className="bigcal--ml-px bigcal-rounded-none bigcal-[&_svg]:bigcal-size-5"
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
                      className="bigcal--ml-px bigcal-rounded-none bigcal-[&_svg]:bigcal-size-5"
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
                      className="bigcal--ml-px bigcal-rounded-none bigcal-[&_svg]:bigcal-size-5"
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
                      className="bigcal--ml-px bigcal-rounded-l-none bigcal-[&_svg]:bigcal-size-5"
                      onClick={() => handleViewChange("agenda")}
                    >
                      <CalendarRange strokeWidth={1.8} />
                    </Button>
                  )}
                </div>
              )}

              {shouldShowUserSelect && <UserSelect />}
            </div>
          )}

          {showAddEventButton && (
            <AddEventDialog>
              <Button className={cn("bigcal-w-full sm:bigcal-w-auto", addButtonClassName)}>
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

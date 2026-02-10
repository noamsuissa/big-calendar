// Calendar Context and Provider
export { CalendarProvider, useCalendar } from "./calendar/contexts/calendar-context";

// Main Calendar Container
export { ClientContainer } from "./calendar/components/client-container";

// Calendar Views
export { CalendarDayView } from "./calendar/components/week-and-day-view/calendar-day-view";
export { CalendarWeekView } from "./calendar/components/week-and-day-view/calendar-week-view";
export { CalendarMonthView } from "./calendar/components/month-view/calendar-month-view";
export { CalendarYearView } from "./calendar/components/year-view/calendar-year-view";
export { CalendarAgendaView } from "./calendar/components/agenda-view/calendar-agenda-view";

// Calendar Header Components
export { CalendarHeader } from "./calendar/components/header/calendar-header";
export { TodayButton } from "./calendar/components/header/today-button";
export { DateNavigator } from "./calendar/components/header/date-navigator";
export { UserSelect } from "./calendar/components/header/user-select";

// Calendar Dialogs
export { AddEventDialog } from "./calendar/components/dialogs/add-event-dialog";
export { EditEventDialog } from "./calendar/components/dialogs/edit-event-dialog";
export { EventDetailsDialog } from "./calendar/components/dialogs/event-details-dialog";

// Calendar Settings Components
export { ChangeBadgeVariantInput } from "./calendar/components/change-badge-variant-input";
export { ChangeVisibleHoursInput } from "./calendar/components/change-visible-hours-input";
export { ChangeWorkingHoursInput } from "./calendar/components/change-working-hours-input";

// Calendar DND Components
export { DndProviderWrapper } from "./calendar/components/dnd/dnd-provider";
export { DraggableEvent, ItemTypes } from "./calendar/components/dnd/draggable-event";
export { DroppableDayCell } from "./calendar/components/dnd/droppable-day-cell";
export { DroppableTimeBlock } from "./calendar/components/dnd/droppable-time-block";
export { CustomDragLayer } from "./calendar/components/dnd/custom-drag-layer";

// Calendar Hooks
export { useUpdateEvent } from "./calendar/hooks/use-update-event";

// Calendar Helpers
export {
  rangeText,
  navigateDate,
  getEventsCount,
  getCurrentEvents,
  groupEvents,
  getEventBlockStyle,
  isWorkingHour,
  getVisibleHours,
  getCalendarCells,
  calculateMonthEventPositions,
  getMonthCellEvents,
} from "./calendar/helpers";

// Calendar Schemas
export { eventSchema } from "./calendar/schemas";

// UI Components
export { Button, buttonVariants } from "./components/ui/button";
export { Badge, badgeVariants } from "./components/ui/badge";
export { Input } from "./components/ui/input";
export { Textarea } from "./components/ui/textarea";
export { Label } from "./components/ui/label";
export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./components/ui/dialog";
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from "./components/ui/select";
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./components/ui/popover";
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
export { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
export { AvatarGroup } from "./components/ui/avatar-group";
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
export { Switch } from "./components/ui/switch";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";
export { Skeleton } from "./components/ui/skeleton";
export { SingleCalendar } from "./components/ui/single-calendar";
export { SingleDayPicker } from "./components/ui/single-day-picker";
export { TimeInput } from "./components/ui/time-input";
export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, useFormField } from "./components/ui/form";

// Layout Components
export { Header } from "./components/layout/header";
export { ToggleTheme } from "./components/layout/change-theme";

// Utilities
export { cn } from "./lib/utils";
export { useDisclosure } from "./hooks/use-disclosure";

// Cookie Utilities
export { getTheme } from "./cookies/get";
export { setTheme } from "./cookies/set";

// Constants
export { THEME_COOKIE_NAME, THEME_COOKIE_MAX_AGE, DEFAULT_VALUES } from "./constants/cookies.const";
export { THEMES_VALUES } from "./constants/theme.const";

// Styles
export { inter } from "./styles/fonts";

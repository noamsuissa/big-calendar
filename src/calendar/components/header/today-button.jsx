import { formatDate } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

export function TodayButton() {
  const { setSelectedDate } = useCalendar();

  const today = new Date();
  const handleClick = () => setSelectedDate(today);

  return (
    <button
      className="bigcal-flex bigcal-size-14 bigcal-flex-col bigcal-items-start bigcal-overflow-hidden bigcal-rounded-lg bigcal-border focus-visible:bigcal-outline-none focus-visible:bigcal-ring-1 focus-visible:bigcal-ring-ring"
      onClick={handleClick}
    >
      <p className="bigcal-flex bigcal-h-6 bigcal-w-full bigcal-items-center bigcal-justify-center bigcal-bg-primary bigcal-text-center bigcal-text-xs bigcal-font-semibold bigcal-text-primary-foreground">
        {formatDate(today, "MMM").toUpperCase()}
      </p>
      <p className="bigcal-flex bigcal-w-full bigcal-items-center bigcal-justify-center bigcal-text-lg bigcal-font-bold">{today.getDate()}</p>
    </button>
  );
}

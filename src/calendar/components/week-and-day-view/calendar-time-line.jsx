import { format } from "date-fns";
import { useEffect, useState } from "react";

export function CalendarTimeline({ firstVisibleHour, lastVisibleHour }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentTimePosition = () => {
    const minutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const visibleStartMinutes = firstVisibleHour * 60;
    const visibleEndMinutes = lastVisibleHour * 60;
    const visibleRangeMinutes = visibleEndMinutes - visibleStartMinutes;

    return ((minutes - visibleStartMinutes) / visibleRangeMinutes) * 100;
  };

  const formatCurrentTime = () => {
    return format(currentTime, "h:mm a");
  };

  const currentHour = currentTime.getHours();
  if (currentHour < firstVisibleHour || currentHour >= lastVisibleHour) return null;

  return (
    <div className="bigcal-pointer-events-none bigcal-absolute bigcal-inset-x-0 bigcal-z-50 bigcal-border-t bigcal-border-primary" style={{ top: `${getCurrentTimePosition()}%` }}>
      <div className="bigcal-absolute bigcal-left-0 bigcal-top-0 bigcal-size-3 bigcal--translate-x-1/2 bigcal--translate-y-1/2 bigcal-rounded-full bigcal-bg-primary"></div>
      <div className="bigcal-absolute bigcal--left-18 bigcal-flex bigcal-w-16 bigcal--translate-y-1/2 bigcal-justify-end bigcal-bg-background bigcal-pr-1 bigcal-text-xs bigcal-font-medium bigcal-text-primary">{formatCurrentTime()}</div>
    </div>
  );
}

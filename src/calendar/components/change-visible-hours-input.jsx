import { useState } from "react";
import { Info } from "lucide-react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Button } from "@/components/ui/button";
import { TimeInput } from "@/components/ui/time-input";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export function ChangeVisibleHoursInput() {
  const { visibleHours, setVisibleHours } = useCalendar();

  const [from, setFrom] = useState({ hour: visibleHours.from, minute: 0 });
  const [to, setTo] = useState({ hour: visibleHours.to, minute: 0 });

  const handleApply = () => {
    const toHour = to.hour === 0 ? 24 : to.hour;
    setVisibleHours({ from: from.hour, to: toHour });
  };

  return (
    <div className="bigcal-flex bigcal-flex-col bigcal-gap-2">
      <div className="bigcal-flex bigcal-items-center bigcal-gap-2">
        <p className="bigcal-text-sm bigcal-font-semibold">Change visible hours</p>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Info className="bigcal-size-3" />
            </TooltipTrigger>

            <TooltipContent className="bigcal-max-w-80 bigcal-text-center">
              <p>If an event falls outside the specified visible hours, the visible hours will automatically adjust to include that event.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bigcal-flex bigcal-items-center bigcal-gap-4">
        <p>From</p>
        <TimeInput id="start-time" hourCycle={12} granularity="hour" value={from} onChange={setFrom} />
        <p>To</p>
        <TimeInput id="end-time" hourCycle={12} granularity="hour" value={to} onChange={setTo} />
      </div>

      <Button className="bigcal-mt-4 bigcal-w-fit" onClick={handleApply}>
        Apply
      </Button>
    </div>
  );
}

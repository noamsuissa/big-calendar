import { format } from "date-fns";

import { useDisclosure } from "@/hooks/use-disclosure";

import { Button } from "@/components/ui/button";
import { SingleCalendar } from "@/components/ui/single-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

// ================================== //

function SingleDayPicker({ id, onSelect, className, placeholder, labelVariant = "PPP", value, ...props }) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleSelect = (date) => {
    onSelect(date);
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onToggle} modal>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn("bigcal-group bigcal-relative bigcal-h-9 bigcal-w-full bigcal-justify-start bigcal-whitespace-nowrap bigcal-px-3 bigcal-py-2 bigcal-font-normal hover:bigcal-bg-inherit", className)}
          {...props}
        >
          {value && <span>{format(value, labelVariant)}</span>}
          {!value && <span className="bigcal-text-muted-foreground">{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="bigcal-w-fit bigcal-p-0">
        <SingleCalendar mode="single" selected={value} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

// ================================== //

export { SingleDayPicker };

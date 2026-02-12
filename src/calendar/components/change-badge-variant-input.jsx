import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ChangeBadgeVariantInput() {
  const { badgeVariant, setBadgeVariant } = useCalendar();

  return (
    <div className="bigcal-space-y-2">
      <p className="bigcal-text-sm bigcal-font-semibold">Change badge variant</p>

      <Select value={badgeVariant} onValueChange={setBadgeVariant}>
        <SelectTrigger className="bigcal-w-48">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="dot">Dot</SelectItem>
          <SelectItem value="colored">Colored</SelectItem>
          <SelectItem value="mixed">Mixed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

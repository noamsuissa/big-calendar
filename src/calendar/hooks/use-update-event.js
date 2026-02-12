import { useCalendar } from "@/calendar/contexts/calendar-context";

/**
 * useUpdateEvent - Hook for updating events
 * 
 * @deprecated Use useCalendar().updateEvent directly instead
 * This hook is kept for backward compatibility but now just returns the updateEvent from context
 * 
 * @returns {{updateEvent: Function}} Object with updateEvent function
 */
export function useUpdateEvent() {
  const { updateEvent } = useCalendar();

  return { updateEvent };
}

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CALENDAR_ITEMS_MOCK, USERS_MOCK } from "@/calendar/mocks";

const CalendarContext = createContext({});

const DEFAULT_WORKING_HOURS = {
  0: { from: 0, to: 0 },
  1: { from: 8, to: 17 },
  2: { from: 8, to: 17 },
  3: { from: 8, to: 17 },
  4: { from: 8, to: 17 },
  5: { from: 8, to: 17 },
  6: { from: 8, to: 12 },
};

const DEFAULT_VISIBLE_HOURS = { from: 7, to: 18 };

/**
 * CalendarProvider - Highly customizable calendar context provider
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {Array} [props.users] - Initial users array (optional if useMocks=true or api.getUsers provided)
 * @param {Array} [props.events] - Initial events array (optional if useMocks=true or api.getEvents provided)
 * @param {Object} [props.api] - API functions for calendar operations
 * @param {() => Promise<Array>} [props.api.getEvents] - Function to fetch events
 * @param {() => Promise<Array>} [props.api.getUsers] - Function to fetch users
 * @param {(event: Object) => Promise<Object>} [props.api.createEvent] - Function to create event
 * @param {(event: Object) => Promise<Object>} [props.api.updateEvent] - Function to update event
 * @param {(eventId: string|number) => Promise<void>} [props.api.deleteEvent] - Function to delete event
 * @param {boolean} [props.useMocks=false] - Whether to use mock data when API functions are not provided
 * @param {Object} [props.defaultSettings] - Default calendar settings
 * @param {string} [props.defaultSettings.badgeVariant="colored"] - Default badge variant
 * @param {{from: number, to: number}} [props.defaultSettings.visibleHours] - Default visible hours
 * @param {Record<number, {from: number, to: number}>} [props.defaultSettings.workingHours] - Default working hours
 * @param {Function} [props.onSettingsChange] - Callback when settings change
 * @param {Function} [props.onEventCreate] - Callback when event is created
 * @param {Function} [props.onEventUpdate] - Callback when event is updated
 * @param {Function} [props.onEventDelete] - Callback when event is deleted
 */
export function CalendarProvider({ 
  children, 
  users: initialUsers,
  events: initialEvents,
  api = {},
  useMocks = false,
  defaultSettings = {},
  onSettingsChange,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
}) {
  const [badgeVariant, setBadgeVariant] = useState(defaultSettings.badgeVariant || "colored");
  const [visibleHours, setVisibleHours] = useState(defaultSettings.visibleHours || DEFAULT_VISIBLE_HOURS);
  const [workingHours, setWorkingHours] = useState(defaultSettings.workingHours || DEFAULT_WORKING_HOURS);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState("all");

  // State for users and events
  const [users, setUsers] = useState(initialUsers || []);
  const [events, setEvents] = useState(initialEvents || []);
  const [isLoading, setIsLoading] = useState(false);

  // Determine if we should use mocks
  const shouldUseMocks = useMocks || (!api.getEvents && !initialEvents);
  const shouldUseMockUsers = useMocks || (!api.getUsers && !initialUsers);

  // Load users
  useEffect(() => {
    if (shouldUseMockUsers && users.length === 0) {
      setUsers(USERS_MOCK);
    } else if (api.getUsers && !shouldUseMockUsers) {
      setIsLoading(true);
      api.getUsers()
        .then((fetchedUsers) => {
          setUsers(fetchedUsers);
        })
        .catch((error) => {
          console.error("Failed to fetch users:", error);
          if (useMocks) {
            setUsers(USERS_MOCK);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [api.getUsers, shouldUseMockUsers, useMocks]);

  // Load events
  useEffect(() => {
    if (shouldUseMocks && events.length === 0) {
      setEvents(CALENDAR_ITEMS_MOCK);
    } else if (api.getEvents && !shouldUseMocks) {
      setIsLoading(true);
      api.getEvents()
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
        })
        .catch((error) => {
          console.error("Failed to fetch events:", error);
          if (useMocks) {
            setEvents(CALENDAR_ITEMS_MOCK);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [api.getEvents, shouldUseMocks, useMocks]);

  const handleSelectDate = (date) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const handleBadgeVariantChange = (variant) => {
    setBadgeVariant(variant);
    onSettingsChange?.({ badgeVariant: variant, visibleHours, workingHours });
  };

  const handleVisibleHoursChange = (hours) => {
    setVisibleHours(hours);
    onSettingsChange?.({ badgeVariant, visibleHours: hours, workingHours });
  };

  const handleWorkingHoursChange = (hours) => {
    setWorkingHours(hours);
    onSettingsChange?.({ badgeVariant, visibleHours, workingHours: hours });
  };

  // API wrapper functions
  const createEvent = useCallback(async (eventData) => {
    if (api.createEvent) {
      try {
        const newEvent = await api.createEvent(eventData);
        setEvents((prev) => [...prev, newEvent]);
        onEventCreate?.(newEvent);
        return newEvent;
      } catch (error) {
        console.error("Failed to create event:", error);
        throw error;
      }
    } else {
      // Fallback: add to local state
      const newEvent = { ...eventData, id: Date.now() };
      setEvents((prev) => [...prev, newEvent]);
      onEventCreate?.(newEvent);
      return newEvent;
    }
  }, [api.createEvent, onEventCreate]);

  const updateEvent = useCallback(async (eventData) => {
    if (api.updateEvent) {
      try {
        const updatedEvent = await api.updateEvent(eventData);
        setEvents((prev) => {
          const index = prev.findIndex((e) => e.id === eventData.id);
          if (index === -1) return prev;
          return [...prev.slice(0, index), updatedEvent, ...prev.slice(index + 1)];
        });
        onEventUpdate?.(updatedEvent);
        return updatedEvent;
      } catch (error) {
        console.error("Failed to update event:", error);
        throw error;
      }
    } else {
      // Fallback: update local state
      const updatedEvent = { ...eventData };
      setEvents((prev) => {
        const index = prev.findIndex((e) => e.id === eventData.id);
        if (index === -1) return prev;
        return [...prev.slice(0, index), updatedEvent, ...prev.slice(index + 1)];
      });
      onEventUpdate?.(updatedEvent);
      return updatedEvent;
    }
  }, [api.updateEvent, onEventUpdate]);

  const deleteEvent = useCallback(async (eventId) => {
    if (api.deleteEvent) {
      try {
        await api.deleteEvent(eventId);
        setEvents((prev) => prev.filter((e) => e.id !== eventId));
        onEventDelete?.(eventId);
      } catch (error) {
        console.error("Failed to delete event:", error);
        throw error;
      }
    } else {
      // Fallback: remove from local state
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      onEventDelete?.(eventId);
    }
  }, [api.deleteEvent, onEventDelete]);

  const refetchEvents = useCallback(async () => {
    if (api.getEvents) {
      setIsLoading(true);
      try {
        const fetchedEvents = await api.getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to refetch events:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [api.getEvents]);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate: handleSelectDate,
        selectedUserId,
        setSelectedUserId,
        badgeVariant,
        setBadgeVariant: handleBadgeVariantChange,
        users,
        visibleHours,
        setVisibleHours: handleVisibleHoursChange,
        workingHours,
        setWorkingHours: handleWorkingHoursChange,
        events,
        setEvents,
        isLoading,
        // API functions
        createEvent,
        updateEvent,
        deleteEvent,
        refetchEvents,
        // API object for direct access
        api,
        useMocks: shouldUseMocks,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}

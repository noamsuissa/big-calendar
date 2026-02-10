# Calendar Customization Guide

This calendar package is highly customizable. You can control API connectivity, visibility of UI elements, settings, and more without modifying the UI appearance.

## Table of Contents

1. [API Integration](#api-integration)
2. [Mock Data Toggle](#mock-data-toggle)
3. [Visibility Controls](#visibility-controls)
4. [Custom Settings](#custom-settings)
5. [Event Callbacks](#event-callbacks)
6. [Examples](#examples)

## API Integration

Connect the calendar to your backend API by providing API functions to the `CalendarProvider`.

### Basic Setup

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';

const calendarAPI = {
  getEvents: async () => {
    const response = await fetch('/api/events');
    return response.json();
  },
  getUsers: async () => {
    const response = await fetch('/api/users');
    return response.json();
  },
  createEvent: async (eventData) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },
  updateEvent: async (eventData) => {
    const response = await fetch(`/api/events/${eventData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },
  deleteEvent: async (eventId) => {
    await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
  },
};

function App() {
  return (
    <CalendarProvider api={calendarAPI}>
      <ClientContainer view="month" onViewChange={(view) => console.log(view)} />
    </CalendarProvider>
  );
}
```

### Third-Party Calendar Integrations

You can integrate with Google Calendar, Outlook, or any other calendar service:

```jsx
// Google Calendar integration example
const googleCalendarAPI = {
  getEvents: async () => {
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
    });
    return response.result.items.map(transformGoogleEvent);
  },
  createEvent: async (eventData) => {
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: transformToGoogleEvent(eventData),
    });
    return transformGoogleEvent(response.result);
  },
  // ... other methods
};
```

## Mock Data Toggle

Use mock data for development or when API is not available:

```jsx
// Use mocks (default behavior when no API provided)
<CalendarProvider useMocks={true}>
  <ClientContainer view="month" />
</CalendarProvider>

// Or provide initial data
<CalendarProvider 
  users={myUsers} 
  events={myEvents}
  useMocks={false}
>
  <ClientContainer view="month" />
</CalendarProvider>
```

## Visibility Controls

Hide or show specific UI elements without changing the appearance:

### Hide Entire Header

```jsx
<ClientContainer 
  view="month" 
  showHeader={false}
/>
```

### Customize Header Elements

```jsx
<ClientContainer 
  view="month"
  headerProps={{
    showTodayButton: true,        // Show/hide today button
    showDateNavigator: true,      // Show/hide date navigator
    showViewSwitcher: true,       // Show/hide view buttons
    showUserSelect: true,         // Show/hide user filter
    showAddEventButton: true,     // Show/hide add event button
    availableViews: ['day', 'week', 'month'], // Limit available views
  }}
/>
```

## Custom Settings

Configure default calendar settings:

```jsx
const customSettings = {
  badgeVariant: 'colored', // 'colored' | 'outline' | 'default'
  visibleHours: { from: 7, to: 18 },
  workingHours: {
    0: { from: 0, to: 0 },   // Sunday
    1: { from: 8, to: 17 },   // Monday
    2: { from: 8, to: 17 },   // Tuesday
    3: { from: 8, to: 17 },   // Wednesday
    4: { from: 8, to: 17 },   // Thursday
    5: { from: 8, to: 17 },   // Friday
    6: { from: 8, to: 12 },   // Saturday
  },
};

<CalendarProvider 
  defaultSettings={customSettings}
  onSettingsChange={(settings) => {
    // Sync settings to your backend
    console.log('Settings changed:', settings);
  }}
>
  <ClientContainer view="month" />
</CalendarProvider>
```

## Event Callbacks

Listen to calendar events for additional functionality:

```jsx
<CalendarProvider
  api={calendarAPI}
  onEventCreate={(event) => {
    console.log('Event created:', event);
    // Trigger notifications, analytics, etc.
  }}
  onEventUpdate={(event) => {
    console.log('Event updated:', event);
    // Sync to other systems, update cache, etc.
  }}
  onEventDelete={(eventId) => {
    console.log('Event deleted:', eventId);
    // Clean up related data, etc.
  }}
  onSettingsChange={(settings) => {
    console.log('Settings changed:', settings);
    // Persist to localStorage or backend
  }}
>
  <ClientContainer view="month" />
</CalendarProvider>
```

## Examples

### Complete Example with API Integration

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';
import { useState } from 'react';

function MyCalendar() {
  const [view, setView] = useState('month');

  const calendarAPI = {
    getEvents: async () => {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
    getUsers: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
    createEvent: async (eventData) => {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to create event');
      return response.json();
    },
    updateEvent: async (eventData) => {
      const response = await fetch(`/api/events/${eventData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to update event');
      return response.json();
    },
    deleteEvent: async (eventId) => {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
    },
  };

  return (
    <CalendarProvider
      api={calendarAPI}
      defaultSettings={{
        badgeVariant: 'colored',
        visibleHours: { from: 8, to: 20 },
      }}
      onEventCreate={(event) => {
        // Show success notification
        toast.success('Event created successfully!');
      }}
    >
      <ClientContainer
        view={view}
        onViewChange={setView}
        showHeader={true}
        headerProps={{
          showAddEventButton: true,
          availableViews: ['day', 'week', 'month'],
        }}
      />
    </CalendarProvider>
  );
}
```

### Minimal Example (Using Mocks)

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';

function SimpleCalendar() {
  return (
    <CalendarProvider useMocks={true}>
      <ClientContainer view="month" />
    </CalendarProvider>
  );
}
```

### Custom Header Configuration

```jsx
<ClientContainer
  view="month"
  headerProps={{
    showTodayButton: false,      // Hide today button
    showDateNavigator: true,      // Keep date navigator
    showViewSwitcher: true,       // Keep view switcher
    showUserSelect: false,        // Hide user filter
    showAddEventButton: true,     // Keep add button
    availableViews: ['week', 'month'], // Only show week and month views
  }}
/>
```

## API Function Signatures

All API functions are optional. If not provided, the calendar will use mock data or local state.

### `getEvents(): Promise<CalendarEvent[]>`
Fetches all events. Should return an array of event objects.

### `getUsers(): Promise<CalendarUser[]>`
Fetches all users. Should return an array of user objects.

### `createEvent(eventData): Promise<CalendarEvent>`
Creates a new event. Receives event data (without id) and should return the created event with id.

### `updateEvent(eventData): Promise<CalendarEvent>`
Updates an existing event. Receives complete event data and should return the updated event.

### `deleteEvent(eventId): Promise<void>`
Deletes an event by ID. Should return void or a promise that resolves to void.

## Event Data Structure

```typescript
interface CalendarEvent {
  id: string | number;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  title: string;
  description: string;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray';
  user: {
    id: string;
    name: string;
    picturePath?: string | null;
  };
}
```

## Notes

- All customization options are optional and have sensible defaults
- The UI appearance remains unchanged - only functionality is customized
- API functions can be async and should handle errors appropriately
- The calendar will fall back to mock data if API functions fail and `useMocks` is true
- Settings can be changed programmatically through the context or via the provided UI components

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

## Styling Customization

The calendar is fully customizable for styling without affecting the default UI appearance. You can customize colors, spacing, borders, typography, and layout through CSS variables and className props.

### CSS Variables

Override CSS variables in your application's CSS to customize the calendar appearance:

```css
:root {
  /* Color customization (already supported) */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --border: 240 5.9% 90%;
  --radius: 0.5rem;
  
  /* Calendar-specific spacing and layout */
  --calendar-container-border-radius: 0.75rem; /* rounded-xl */
  --calendar-container-padding: 0;
  --calendar-header-padding: 1rem; /* p-4 */
  --calendar-header-gap: 1rem; /* gap-4 */
  --calendar-header-border-width: 1px;
  --calendar-spacing-xs: 0.25rem; /* gap-1 */
  --calendar-spacing-sm: 0.5rem; /* gap-2 */
  --calendar-spacing-md: 0.75rem; /* gap-3 */
  --calendar-spacing-lg: 1rem; /* gap-4 */
  --calendar-spacing-xl: 1.5rem; /* gap-6 */
}

.dark {
  /* Override for dark mode */
  --calendar-container-border-radius: 0.75rem;
  --calendar-header-padding: 1rem;
  /* ... other variables */
}
```

### className Props

Add custom classes to override or extend component styles:

```jsx
<ClientContainer
  view="month"
  className="my-custom-calendar" // Custom container styles
  headerClassName="custom-header" // Custom header styles
  contentClassName="custom-content" // Custom content area styles
  headerProps={{
    className: "additional-header-class",
    leftSectionClassName: "custom-left-section",
    rightSectionClassName: "custom-right-section",
    viewSwitcherClassName: "custom-view-switcher",
    addButtonClassName: "custom-add-button",
  }}
/>
```

### CSS Override Examples

#### Custom Border Radius

```css
/* Make calendar container square */
:root {
  --calendar-container-border-radius: 0;
}

/* Or override with className */
.my-calendar {
  border-radius: 0 !important;
}
```

#### Custom Spacing

```css
/* Increase header padding */
:root {
  --calendar-header-padding: 1.5rem;
}

/* Or use className */
.custom-header {
  padding: 1.5rem !important;
}
```

#### Custom Colors

```css
/* Change calendar border color */
:root {
  --border: 220 13% 91%; /* Custom border color */
}

/* Change primary color */
:root {
  --primary: 221 83% 53%; /* Blue primary */
}
```

#### Custom Layout

```jsx
// Remove border radius
<ClientContainer
  view="month"
  className="rounded-none"
/>

// Add custom shadow
<ClientContainer
  view="month"
  className="shadow-2xl"
/>

// Custom header styling
<ClientContainer
  view="month"
  headerProps={{
    className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  }}
/>
```

### Tailwind Class Overrides

Since the calendar uses Tailwind CSS, you can override classes using Tailwind's specificity:

```css
/* Override specific calendar classes */
.big-calendar-container {
  border-radius: 0.5rem; /* Override rounded-xl */
  padding: 1rem; /* Add padding */
}

.big-calendar-header {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
}
```

### Complete Styling Example

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';
import './custom-calendar-styles.css'; // Your custom CSS

function MyStyledCalendar() {
  return (
    <CalendarProvider useMocks={true}>
      <ClientContainer
        view="month"
        className="my-custom-calendar shadow-lg"
        headerClassName="bg-blue-50 border-blue-200"
        contentClassName="p-2"
        headerProps={{
          leftSectionClassName: "gap-4",
          rightSectionClassName: "gap-2",
          addButtonClassName: "bg-blue-600 hover:bg-blue-700",
        }}
      />
    </CalendarProvider>
  );
}
```

```css
/* custom-calendar-styles.css */
:root {
  /* Container and header */
  --calendar-container-border-radius: 1rem;
  --calendar-header-padding: 1.25rem;
  --calendar-spacing-lg: 1.25rem;
  
  /* Event cards */
  --calendar-event-border-radius: 0.5rem;
  --calendar-event-border-width: 2px;
  --calendar-event-padding-x: 0.75rem;
  --calendar-event-padding-y: 0.5rem;
  
  /* Custom event colors */
  --calendar-event-blue-border: 217 91% 50%;
  --calendar-event-blue-bg: 217 91% 98%;
  --calendar-event-blue-text: 217 91% 25%;
  
  --calendar-event-red-border: 0 84% 55%;
  --calendar-event-red-bg: 0 84% 97%;
  --calendar-event-red-text: 0 84% 25%;
}

.my-custom-calendar {
  border: 2px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Override specific event styles */
.my-custom-calendar [class*="border-blue"] {
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}
```

### Event-Specific Styling Examples

#### Custom Event Border Radius

```css
/* Make all events rounded */
:root {
  --calendar-event-border-radius: 1rem; /* Fully rounded */
}

/* Or target specific views */
.calendar-month-view [class*="event"] {
  border-radius: 0.25rem; /* Less rounded in month view */
}

.calendar-week-view [class*="event"] {
  border-radius: 0.75rem; /* More rounded in week view */
}
```

#### Custom Event Colors

```css
/* Change all blue events to purple */
.border-blue-200 {
  border-color: hsl(262, 83%, 58%) !important;
  background-color: hsl(262, 83%, 95%) !important;
  color: hsl(262, 83%, 30%) !important;
}

/* Make red events more vibrant */
.border-red-200 {
  border-color: hsl(0, 100%, 50%) !important;
  background-color: hsl(0, 100%, 97%) !important;
  color: hsl(0, 100%, 20%) !important;
}
```

#### Custom Event Borders

```css
/* Thicker borders for all events */
:root {
  --calendar-event-border-width: 2px;
}

/* Dashed borders */
[class*="border-blue-200"],
[class*="border-green-200"],
[class*="border-red-200"] {
  border-style: dashed !important;
}

/* No borders */
[class*="event"] {
  border-width: 0 !important;
}
```

### Styling Best Practices

1. **Use CSS Variables** for theme-wide changes (colors, spacing, borders)
2. **Use className Props** for component-specific overrides
3. **Use Tailwind Classes** for quick utility-based styling
4. **Combine Approaches** - Use CSS variables for defaults and className for specific instances
5. **Maintain Specificity** - Use `!important` sparingly, prefer higher specificity selectors

### Event Card Customization

Customize event cards (colors, borders, radiuses) through CSS variables and className props:

#### Event Colors

Override event colors using CSS variables:

```css
:root {
  /* Blue event colors */
  --calendar-event-blue-border: 217 91% 60%;
  --calendar-event-blue-bg: 217 91% 95%;
  --calendar-event-blue-text: 217 91% 30%;
  
  /* Green event colors */
  --calendar-event-green-border: 142 71% 45%;
  --calendar-event-green-bg: 142 71% 95%;
  --calendar-event-green-text: 142 71% 25%;
  
  /* Red event colors */
  --calendar-event-red-border: 0 84% 60%;
  --calendar-event-red-bg: 0 84% 95%;
  --calendar-event-red-text: 0 84% 30%;
  
  /* Customize all colors similarly */
  --calendar-event-yellow-border: 43 96% 56%;
  --calendar-event-purple-border: 262 83% 58%;
  --calendar-event-orange-border: 25 95% 53%;
  --calendar-event-gray-border: 0 0% 90%;
}
```

#### Event Border Radius and Spacing

```css
:root {
  --calendar-event-border-radius: 0.5rem; /* Change from default 0.375rem */
  --calendar-event-border-width: 2px; /* Thicker borders */
  --calendar-event-padding-x: 0.75rem; /* More horizontal padding */
  --calendar-event-padding-y: 0.5rem; /* More vertical padding */
  --calendar-event-gap: 0.25rem; /* More gap between elements */
}
```

#### Override Event Styles with CSS

```css
/* Target all event cards */
[class*="event"] {
  border-radius: 0.5rem !important;
  border-width: 2px !important;
}

/* Target specific event colors */
.border-blue-200 {
  border-color: #your-custom-blue !important;
  background-color: #your-custom-bg !important;
}

/* Target event cards in specific views */
.calendar-month-view [class*="event"] {
  border-radius: 0.25rem;
}

.calendar-week-view [class*="event"] {
  border-radius: 0.5rem;
}
```

#### Override Event Colors Completely

```css
/* Replace all blue events with custom color */
.border-blue-200 {
  border-color: hsl(280, 70%, 50%) !important;
  background-color: hsl(280, 70%, 95%) !important;
  color: hsl(280, 70%, 20%) !important;
}

/* Dark mode overrides */
.dark .border-blue-200 {
  border-color: hsl(280, 70%, 40%) !important;
  background-color: hsl(280, 70%, 10%) !important;
  color: hsl(280, 70%, 85%) !important;
}
```

### Available CSS Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--calendar-container-border-radius` | `0.75rem` | Container border radius |
| `--calendar-container-padding` | `0` | Container padding |
| `--calendar-header-padding` | `1rem` | Header padding |
| `--calendar-header-gap` | `1rem` | Header gap spacing |
| `--calendar-header-border-width` | `1px` | Header border width |
| `--calendar-spacing-xs` | `0.25rem` | Extra small spacing |
| `--calendar-spacing-sm` | `0.5rem` | Small spacing |
| `--calendar-spacing-md` | `0.75rem` | Medium spacing |
| `--calendar-spacing-lg` | `1rem` | Large spacing |
| `--calendar-spacing-xl` | `1.5rem` | Extra large spacing |
| `--calendar-event-border-radius` | `0.375rem` | Event card border radius |
| `--calendar-event-border-width` | `1px` | Event card border width |
| `--calendar-event-padding-x` | `0.5rem` | Event card horizontal padding |
| `--calendar-event-padding-y` | `0.375rem` | Event card vertical padding |
| `--calendar-event-gap` | `0.125rem` | Event card internal gap |
| `--calendar-event-{color}-border` | Various | Event border color (HSL) |
| `--calendar-event-{color}-bg` | Various | Event background color (HSL) |
| `--calendar-event-{color}-text` | Various | Event text color (HSL) |

**Event Color Variables** (replace `{color}` with: `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`):
- `--calendar-event-{color}-border`
- `--calendar-event-{color}-bg`
- `--calendar-event-{color}-text`

## Notes

- All customization options are optional and have sensible defaults
- The UI appearance remains unchanged by default - only functionality is customized
- Styling customization does not affect functionality - all features work the same
- API functions can be async and should handle errors appropriately
- The calendar will fall back to mock data if API functions fail and `useMocks` is true
- Settings can be changed programmatically through the context or via the provided UI components
- CSS variables and className props can be combined for maximum flexibility

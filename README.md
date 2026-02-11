# Big Calendar

A highly customizable React calendar component library with multiple views, drag-and-drop, API integration, and extensive customization options.

> **Note**: This package is originally from [lramos33/big-calendar](https://github.com/lramos33/big-calendar) on GitHub.

## Features

- 📅 **Multiple Views**: Day, Week, Month, Year, and Agenda views
- 🎨 **Highly Customizable**: Full control over styling, API integration, and behavior
- 🔄 **Drag & Drop**: Reschedule events by dragging
- 🎯 **API Integration**: Connect to your backend or third-party calendars
- 🎨 **Styling Control**: CSS variables, className props, and theme customization
- 👤 **Single-User Mode**: Simplified UI for single-user applications
- 📱 **Responsive**: Works on all screen sizes
- 🌙 **Dark Mode**: Built-in dark mode support

## Installation

```bash
npm install big-calendar
```

## Quick Start

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';
import 'big-calendar/styles'; // Import styles

function App() {
  return (
    <CalendarProvider useMocks={true}>
      <ClientContainer view="month" />
    </CalendarProvider>
  );
}
```

## Basic Usage

### With Mock Data

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';
import 'big-calendar/styles';

function MyCalendar() {
  return (
    <CalendarProvider useMocks={true}>
      <ClientContainer view="month" />
    </CalendarProvider>
  );
}
```

### With API Integration

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';
import 'big-calendar/styles';

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

function MyCalendar() {
  return (
    <CalendarProvider api={calendarAPI}>
      <ClientContainer view="month" />
    </CalendarProvider>
  );
}
```

## Customization

### Side Panel for Event Details

```jsx
<CalendarProvider
  eventClickHandler={{
    mode: "sidePanel",
    sidePanelPosition: "right",
    sidePanelWidth: 400,
  }}
>
  <ClientContainer view="month" />
</CalendarProvider>
```

### Single-User Mode

```jsx
<CalendarProvider
  singleUser={true}
  currentUser={{
    id: "user-123",
    name: "John Doe",
    picturePath: "/avatar.jpg",
  }}
>
  <ClientContainer view="month" />
</CalendarProvider>
```

### Custom Styling

```css
/* Override CSS variables */
:root {
  --calendar-container-border-radius: 1rem;
  --calendar-event-border-radius: 0.5rem;
  --calendar-event-blue-bg: 217 91% 95%;
}
```

```jsx
<ClientContainer
  view="month"
  className="my-custom-calendar"
  headerClassName="custom-header"
/>
```

## Documentation

For complete documentation and customization options, see [CUSTOMIZATION.md](./CUSTOMIZATION.md).

## Requirements

- React 18+
- Tailwind CSS (for styling)

## Tailwind CSS Setup

You'll need to configure Tailwind CSS in your project. Add to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/big-calendar/dist/**/*.{js,jsx}", // Include big-calendar
  ],
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [],
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

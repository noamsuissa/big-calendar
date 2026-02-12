# big-calendar

React + Tailwind implementation of [Big Calendar](https://github.com/lramos33/big-calendar), with extended host-app control over views, events, and behavior via props and API.

---

## Thank you & credit

**A big thank you to the original author** [**lramos33**](https://github.com/lramos33) for the [Big Calendar](https://github.com/lramos33/big-calendar) project this package is based on. This fork adds React + Tailwind, host-controlled behavior, and API integration while building on that work.

---

## Install

```bash
npm install big-calendar
```

**Requirements:** React 18+, Tailwind CSS in your app.

Add the package to Tailwind content in `tailwind.config.js`:

```js
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/big-calendar/dist/**/*.{js,jsx}",
],
```

## Usage

```jsx
import { CalendarProvider, CalendarRoot, ClientContainer } from 'big-calendar';
import 'big-calendar/styles';

// With mock data
<CalendarProvider useMocks={true}>
  <CalendarRoot>
    <ClientContainer view="month" />
  </CalendarRoot>
</CalendarProvider>

// With your API
const api = {
  getEvents: async () => (await fetch('/api/events')).json(),
  getUsers: async () => (await fetch('/api/users')).json(),
  createEvent: async (data) => /* ... */,
  updateEvent: async (data) => /* ... */,
  deleteEvent: async (id) => /* ... */,
};
<CalendarProvider api={api}>
  <CalendarRoot>
    <ClientContainer view="month" />
  </CalendarRoot>
</CalendarProvider>
```

**Views:** `view="month" | "week" | "day" | "agenda" | "year"`

## Customization

- **Single-user:** `singleUser={true}` and `currentUser={{ id, name, picturePath }}`
- **Event click:** `eventClickHandler={{ mode: "sidePanel", sidePanelPosition: "right", sidePanelWidth: 400 }}`
- **Styling:** CSS variables (e.g. `--calendar-container-border-radius`) or `className` / `headerClassName` on `ClientContainer`

Full options: [CUSTOMIZATION.md](./CUSTOMIZATION.md).

## License

MIT

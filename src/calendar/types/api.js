/**
 * Calendar API Interface
 * 
 * Define the structure for API functions that can be passed to CalendarProvider.
 * All functions are optional - if not provided, the calendar will use mock data.
 */

/**
 * @typedef {Object} CalendarUser
 * @property {string} id - Unique user identifier
 * @property {string} name - User display name
 * @property {string|null} picturePath - Optional user avatar path
 */

/**
 * @typedef {Object} CalendarEvent
 * @property {string|number} id - Unique event identifier
 * @property {string} startDate - ISO string of event start date/time
 * @property {string} endDate - ISO string of event end date/time
 * @property {string} title - Event title
 * @property {string} description - Event description
 * @property {string} color - Event color (blue, green, red, yellow, purple, orange, gray)
 * @property {CalendarUser} user - User assigned to the event
 */

/**
 * @typedef {Object} CalendarAPI
 * @property {() => Promise<CalendarEvent[]>} [getEvents] - Fetch all events
 * @property {() => Promise<CalendarUser[]>} [getUsers] - Fetch all users
 * @property {(event: Omit<CalendarEvent, 'id'>) => Promise<CalendarEvent>} [createEvent] - Create a new event
 * @property {(event: CalendarEvent) => Promise<CalendarEvent>} [updateEvent] - Update an existing event
 * @property {(eventId: string|number) => Promise<void>} [deleteEvent] - Delete an event
 */

/**
 * @typedef {Object} CalendarSettings
 * @property {string} badgeVariant - Badge variant ('colored' | 'outline' | 'default')
 * @property {{from: number, to: number}} visibleHours - Hours to display in day/week views
 * @property {Record<number, {from: number, to: number}>} workingHours - Working hours per day of week (0-6)
 */

export {};

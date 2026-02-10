import { CALENDAR_ITEMS_MOCK, USERS_MOCK } from "@/calendar/mocks";

/**
 * Default API functions - used when no custom API is provided
 * These functions use mock data. In production, replace these with actual API calls.
 * 
 * Note: These are now primarily used for backward compatibility.
 * The CalendarProvider handles API calls directly through the api prop.
 */

export const getEvents = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return CALENDAR_ITEMS_MOCK;
};

export const getUsers = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return USERS_MOCK;
};

/**
 * Example API implementation for reference
 * 
 * export const createEvent = async (eventData) => {
 *   const response = await fetch('/api/events', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(eventData),
 *   });
 *   if (!response.ok) throw new Error('Failed to create event');
 *   return response.json();
 * };
 * 
 * export const updateEvent = async (eventData) => {
 *   const response = await fetch(`/api/events/${eventData.id}`, {
 *     method: 'PUT',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(eventData),
 *   });
 *   if (!response.ok) throw new Error('Failed to update event');
 *   return response.json();
 * };
 * 
 * export const deleteEvent = async (eventId) => {
 *   const response = await fetch(`/api/events/${eventId}`, {
 *     method: 'DELETE',
 *   });
 *   if (!response.ok) throw new Error('Failed to delete event');
 * };
 */

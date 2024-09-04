import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface Event {
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
};

let eventsCache: { [key: string]: any[] } = {};
let cacheExpirationTime: { [key: string]: number } = {};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWithinBusinessHours(date: Date, timeZone?: string): boolean {
  const businessHoursStart = 9; // 9:00 AM
  const businessHoursEnd = 17; // 5:00 PM

  const options = { hour12: false, timeZone };
  const hours = new Date(date).toLocaleString("en-US", options).split(" ")[1].split(":")[0];

  const currentHour = parseInt(hours);

  return currentHour >= businessHoursStart && currentHour < businessHoursEnd;
}

export const businessHours = {
  start: "09:00",
  end: "17:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
};

export async function fetchEventsForDate(date: Date): Promise<Event[]> {
  const dateKey = date.toISOString().split('T')[0]; // Cache key based on date

  // Check if the events for this date are already cached
  if (eventsCache[dateKey] && cacheExpirationTime[dateKey] > Date.now()) {
    return eventsCache[dateKey];
  };

  // If not cached or expired, fetch from API
  const response = await fetch(`/api/events?date=${dateKey}`);
  const { events } = await response.json();

  // Cache the events and set expiration time (e.g., 5 minutes)
  eventsCache[dateKey] = events;
  cacheExpirationTime[dateKey] = Date.now() + 2 * 60 * 1000;
  
  // Ensure that events is an array
  if (!Array.isArray(events)) {
    throw new TypeError("Expected an array of events");
  }

  return events;
};

export function filterAndDisableTimes(events: Event[], selectedDate: Date) {
  if (!Array.isArray(events)) {
    throw new TypeError("Expected an array of events");
  }

  const busyTimes = events.filter(event => {
    if (!event.start || !event.start.dateTime) {
      return false; // Skip events without a valid start time
    }

    const eventStart = new Date(event.start.dateTime);

    // Check if the event is within business hours
    const isWithinHours = isWithinBusinessHours(eventStart, event.start.timeZone || "America/Phoenix");

    // Check if the event is on a business day
    const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
    const isBusinessDay = businessHours.days.includes(dayOfWeek);

    return isWithinHours && isBusinessDay;
  });

  // Return the busy times or handle logic to disable them in the UI
  return busyTimes;
}
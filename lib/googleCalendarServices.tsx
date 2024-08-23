import { google } from "googleapis";

export const CalendarEvent = async (eventData: any) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: eventData.name,
    description: eventData.description,
    start: {
      dateTime: new Date(eventData.date).toISOString(),
      timeZone: "America/Phoenix",
    },
    end: {
      dateTime: new Date(eventData.date).toISOString(),
      timeZone: "America/Phoenix",
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event", error);
    throw new Error("Unable to create calendar event");
  }
};

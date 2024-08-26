import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    // Extract JSON body from the request
    const { name, description, date, time } = await req.json();

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const calendar = google.calendar({ version: "v3", auth });

    const eventStartTime = new Date(`${date}T${time}`);
    const eventEndTime = new Date(eventStartTime);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 30); // Assuming 30-minute meetings

    const event = {
      summary: name,
      description: description,
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: process.env.OWNER_TIMEZONE || "America/Phoenix",
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: process.env.OWNER_TIMEZONE || "America/Phoenix",
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return NextResponse.json({ event: response.data }, { status: 200 });
  } catch (error) {
    console.error("Error creating calendar event", error);
    return NextResponse.json({ error: "Unable to create calendar event" }, { status: 500 });
  }
}

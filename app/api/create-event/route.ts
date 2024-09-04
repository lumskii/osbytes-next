import { NextResponse } from "next/server";
import { google } from "googleapis";
import { isWithinBusinessHours } from "@/lib/utils";
import { DateTime } from "luxon";

export async function POST(req: Request, res: Response) {
  try {
    // Extract JSON body from the request
    const { name, email, description, date, timeZone, serviceNeeded } = await req.json();

    if (timeZone){
        console.log("Timezone is set to: ", timeZone);
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_OAUTH_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH });
    const calendar = google.calendar({ version: "v3", auth });

    const eventStartTime = DateTime.fromISO(date, { zone: timeZone });
    const eventEndTime = eventStartTime.plus({ minutes: 30 }); // sets event time duration to 30 minutes

    const isBusinessHours = isWithinBusinessHours(eventStartTime.toJSDate(), timeZone);

    if (!isBusinessHours){
        return NextResponse.json({ error: "Selected time is outside of business hours. Please choose a different time." }, { status: 400 });
    }

    if (eventStartTime){
        console.log("Timezone is set to: ", eventStartTime);
    }

    const event = {
        summary: `Introduction Call with ${name}`,
        description: `Service Needed: ${serviceNeeded}, Additional Notes: ${description}`,
        start: {
          dateTime: eventStartTime.toISO(),
          timeZone: timeZone,
        },
        end: {
          dateTime: eventEndTime.toISO(),
          timeZone: timeZone,
        },
        attendees: [{ email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 }, // 1 day before
            { method: "popup", minutes: 10 }, // 10 minutes before
          ],
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

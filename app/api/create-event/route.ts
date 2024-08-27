import getAccessToken from '@/lib/getAccessToken';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { name, description, date, time } = await req.json();

    const accessToken = await getAccessToken();

    // Log the request body for debugging
    console.log("Request body:", { name, description, date, time });

    // Check if all necessary data is present
    if (!name || !description || !date || !time) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth });

    const eventStartTime = new Date(`${date}T${time}:00`);
    const eventEndTime = new Date(eventStartTime);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 30);

    const event = {
      summary: name,
      description: description,
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: process.env.OWNER_TIMEZONE || 'America/Phoenix',
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: process.env.OWNER_TIMEZONE || 'America/Phoenix',
      },
    };

    // Log the event details before sending it to Google Calendar
    console.log("Event to be created:", event);

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    // Log the response from Google Calendar API
    console.log("Google Calendar API response:", response.data);

    // Check if the response data is present
    if (!response.data) {
        return NextResponse.json(
          { error: "No data received from Google Calendar API" },
          { status: 500 }
        );
      }

    return new Response(JSON.stringify({ event: response.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating calendar event', error);
    return new Response(
      JSON.stringify({ error: 'Unable to create calendar event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(req: Request) {
    try {
        // Set up Google Calendar API client
        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_OAUTH_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
        auth.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH });
        const calendar = google.calendar({ version: 'v3', auth });

        // Make API request to get events
        const response = await calendar.events.list({
            calendarId: 'primary', // Replace with your calendar ID
            timeMin: new Date().toISOString(), // Only fetch events starting from current time
            maxResults: 10, // Maximum number of events to fetch
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items;

        // Send the events as the response
        const nextResponse = NextResponse.json({ events }, { status: 200 });
        nextResponse.headers.set('Cache-Control', 'public, max-age=120, s-maxage=120'); // Cache the response for 2 minutes

        return nextResponse;
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

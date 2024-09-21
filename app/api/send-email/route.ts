import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { name, email, selectedDate, selectedTime } = await req.json();

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_OAUTH_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH });

    const gmail = google.gmail({ version: 'v1', auth });

    const subject = 'Meeting Confirmation';
    const messageBody = `
      Dear ${name},

      Your meeting has been scheduled for ${selectedDate} at ${selectedTime}.

      Thank you for booking with us!

      Best regards,
      Your Team
    `;

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `From: Your Team <your-email@example.com>`,
      `To: ${email}`,
      `Subject: ${utf8Subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      messageBody,
    ];
    const message = messageParts.join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
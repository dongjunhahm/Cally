import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const { eventDetails, token } = req.body;

    console.log("plswork", token);
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const newEvent = await calendar.events.insert({
      calendarId: "primary",
      resource: eventDetails,
    });

    const listedEvents = await calendar.events.list({ 
      calendarId: "primary",
      maxResults: 50,
    });
    const response = { newEvent, listedEvents }

    console.log("Event created:", newEvent);
    console.log("current events", listedEvents);

    res.status(200).json({ message: "Event created", event: response.data });
  } catch (err) {
    console.error("Error creating event:", err.message);
    res.status(500).json({ error: "Error creating event" });
  }
}
